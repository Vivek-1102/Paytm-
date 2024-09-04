const express = require("express");
const { User } = require("./db");
const { router } = require("./routes");

const cors = require("cors")
const app = express();

app.use(cors());
app.use(express.json({extended: true}));
app.use("/api/v1",router);




app.get("/",(req,res)=>{
    res.send("hello world");
})

app.listen(3000);
