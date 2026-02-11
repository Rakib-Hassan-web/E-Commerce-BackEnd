
// ------------role checker---------------
const roleCheckMiddleware =(...roles)=>{
   try {
     return(req,res,next)=>{
        
        if(roles.includes(req.user.role)){
            return next()
        }

         res.status(400).send({message:"invalid request"})
    }
   } catch (error) {
    res.status(500).send({message:"server error"})
   }
}




module.exports= roleCheckMiddleware