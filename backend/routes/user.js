const express = require("express");
const { User, Account } = require("../db");
const { signupValidate,siginValidate, updateValidate } = require("../validate");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authorizeUser } = require("../middleware");

const router = express.Router();


router.post("/signup",async(req,res)=>{

   const { success } = signupValidate.safeParse(req.body)
   if (!success) {
       return res.status(411).json({
           message: "Email already taken / Incorrect inputs"
       })
   }
 const existingUser = await User.findOne({
   username:req.body.username
 });

 if(existingUser){
   console.log("Exisring User")
   return res.status(411).json({
      message: "Username already exist"
   })
 }

   const newUser =await User.create({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName : req.body.lastName,
    password: req.body.password
   }); 
   

   const userId = newUser._id;

   await Account.create({
      userId,
      balance: 1+Math.random()*1000
   })
   
   const token = jwt.sign({userId},JWT_SECRET);

   return res.status(200).json({
    message: "User created successfully.",
    token:token
   });

   
})


router.post("/signin",async (req,res)=>{
   const {success}= siginValidate.safeParse(req.body);
   if(!success){
      res.status(411).json({
         message:"Invalid input!"
      })
   }
   const user = await User.findOne({
      username: req.body.username,
      password:req.body.password
   })

   if(user){
      const userId = user._id;
      const token = jwt.sign({userId},JWT_SECRET);
      return res.status(200).json({
         message :"Welcome!",
         token:token
      })
   }

   return res.status(411).json({
      message:"Invaild credentials"
   })
})


router.put("/update",authorizeUser,async (req,res)=>{
 const {success} = updateValidate.safeParse(req.body);
 if(!success){
   return res.status(411).json({
      message:"Invalid input"
   })
 }
await User.updateOne({_id:req.userId},req.body);
res.status(200).json({
   message:"Successfully updated"
})

   
});

router.get("/bulk",async(req,res)=>{
   const filter = req.query.filter || "";
   const users =await User.find({
      $or:[{
      firstName:{
       "$regex":filter 
      }
   },{
      lastName:{
       "$regex":filter 
   }
 }]
}) 
  console.log(users);
   res.json({
      user: users.map((user)=>{
             console.log(user);
             return ({
               username:user.username,
               firstName:user.firstName,
               lastName:user.lastName,
               userId : user._id
             })
      })
   })
   
})

router.delete("/delete",(req,res)=>{
   
})
module.exports = router;