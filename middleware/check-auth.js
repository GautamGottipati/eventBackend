const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    // Bearer + asdflkajfl form 
    try{
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken =  jwt.verify(token,"#$123)98778#$@&vladi(87vo$^st&&&ck");
    req.userData = { email:decodedToken.email, userId: decodedToken.userId }
    next();
    }catch(error){
        res.status(401).json({
            message:"You are not Authenticated!"
        });
    }
}