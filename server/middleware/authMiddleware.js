
const authMiddleware = ( req, res, next)=>{
    const token = req.cookies
    console.log(token);
    next()
}

module.exports= authMiddleware