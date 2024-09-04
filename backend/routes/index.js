const express =require("express");
const userRouter = require("./user");
const accountRouter = require("./account");

const router = express.Router();

router.use("/user",userRouter)
router.use("/account",accountRouter)


router.get("/",(req,res)=>{
   res.send("hell O from express routers!");
});


module.exports = {
    router
}

