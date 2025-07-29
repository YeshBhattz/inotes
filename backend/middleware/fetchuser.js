const jwt = require('jsonwebtoken');

const fetchuser = (req,res,next)=>{
    //get the user form jwt token and adding ID to req
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error: "Invalid authentication token"})
    }
    try {
    const data = jwt.verify(token,"yeshraj")
    req.user = data.user
    next()
    } catch (error) {

        res.status(401).send({error: "Invalid authentication token"})
        
    }

}

module.exports = fetchuser