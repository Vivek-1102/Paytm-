const express = require("express");
const { authorizeUser } = require("../middleware");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");

const router = express.Router();

router.get("/balance",authorizeUser ,async(req,res)=>{
   const user = await Account.findOne({
    userId : req.userId
   })

   const balance = user.balance;

    res.status(200).json({
        message :`Your account balance is Rs ${balance}`
    })
});


// Transaction have to be atomic which means perform the complete transaction or rollback
// Transactions cannot be halfly done

router.post("/transfer",authorizeUser,async(req,res)=>{
   const senderId = req.userId;
   const amount = req.body.amount;
   const receiverId = req.body.receiver;
 
//    Starting asession for Transaction to be atomic
   const session = await mongoose.startSession();
 
   session.startTransaction();
   //Fetching the accounts between transactions

   const senderAccount = await Account.findOne({
    userId:senderId
   }).session(session);

   if(amount>senderAccount.balance){
    res.json({
        message : "Insuffiecent Balance"
    })
   }

   const receiverAccount = await Account.findOne({
    userId : receiverId
   }).session(session);

   if(!receiverAccount){
    session.abortTransaction();
    res.status(400).json({
        message : "Invalid Account number"
    })
   }

//    Performing the transactions

   await Account.updateOne({
    userId : senderId
   },{
    $inc :{balance:-amount}
   }).session(session);

   await Account.updateOne({
    userId : receiverId
   },{
    $inc :{balance:+amount}
   }).session(session);


    session.commitTransaction();

//    Sending the response.

   res.status(200).json({
    message : `Transaction of amount= ${amount} is transfered successfully.`
   })
   
})

module.exports= router;
