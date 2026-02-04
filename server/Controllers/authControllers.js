

 const RegisterUSer = async (req ,res)=>{
  
    try {
       
 const {FullName ,Email ,Password } =req.body

   if(!FullName ) return res.status(400).send({message : " FullName is Required"})
        
    } catch (error) {
        
    }
 }


 

 module.exports={RegisterUSer}