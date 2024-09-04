const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authorizeUser = (req,res,next)=>{
   const authorizationToken = req.headers.authorization;
  if(!(authorizationToken || authorizationToken.startsWith("Bearer"))){
       return res.status(411).json({
        message : "Invalid token"
       });
  }
  const token = authorizationToken.split(" ")[1];
  const decoded = jwt.verify(token,JWT_SECRET);
  req.userId = decoded.userId;
  next();
}


module.exports={
  authorizeUser
}