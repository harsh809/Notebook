const jwt = require('jsonwebtoken');
const JWT_Secret = "harshwanttobecomeasoftwaredeveloper";

const fetchuser = (req,res,next)=>{
    //get the user from the jwt token and add id to the req body
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send("Please authenticate a valid token");
    }
    try {
        const data = jwt.verify(token,JWT_Secret);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send("Please authenticate a valid token");
    }
}

module.exports = fetchuser;