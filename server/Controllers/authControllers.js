const { isValidEmail, isValidPassword } = require("../services/validation")


 const RegisterUSer = async (req ,res)=>{
  
    try {
       
 const {fullName ,email ,password , phone } =req.body

   if(!fullName ) return res.status(400).send({message : " fullName is Required"})
   if(!email ) return res.status(400).send({message : " email is Required"})
    if(!isValidEmail(email)) return res.status(400).send({message : " Invalid Email"})
   if(!password ) return res.status(400).send({message : " password is Required"})
    if(!isValidPassword(password)) return res.status(400).send({message : " Invalid Password"})

    res.status(201).send({message : "User Registered Successfully"})
        
    } catch (error) {
        res.status(500).send({message : "Internal Server Error"})
    }
 }


 

 module.exports={RegisterUSer}