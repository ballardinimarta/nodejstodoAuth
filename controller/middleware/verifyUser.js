const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyUser = async (req, res, next) => {
    const token = req.cookies.jwtToken;
    if(!token) return res.render("login.ejs", {error: "You have to log in to use that feature!"});

    const validToken = jwt.verify(token, process.env.SECRETKEY);
    
    if(validToken){
        req.user = validToken;
    } 
    next();
}

module.exports = verifyUser;