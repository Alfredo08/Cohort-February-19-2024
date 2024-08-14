const SECRET = "this_must_be_secret";
const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    console.log("Inside the middleware!");
    const token = req.headers.user_token;
    jwt.verify(token, SECRET, (err, decoded) => {
        if(err){
            return res.status(406).json({message: "Unauthorized!"});
        }
        req.userInfo = decoded;
        next();
    });
}

module.exports = validateToken;