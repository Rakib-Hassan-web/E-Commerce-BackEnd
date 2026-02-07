const { verifytoken } = require("../services/helpers")

const authMiddleware = ( req, res, next)=>{
    const token = req.cookies["X-AS-Token"]
 
    if(!token) return res.status(401).send({message : "Invalid Request"})
    const decoded = verifytoken(token)

    if(!decoded) return res.status(401).send({message : "Invalid Request"})
  
        req.user =decoded
        next()


}

module.exports= authMiddleware