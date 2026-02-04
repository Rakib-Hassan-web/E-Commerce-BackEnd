const userSchema = require("../models/userSchema")
const { sendEmail } = require("../services/emailServices")
const { generateOTP } = require("../services/helpers")
const { isValidEmail, isValidPassword } = require("../services/validation")


 const RegisterUSer = async (req ,res)=>{
  
    try {
       
 const {fullName ,email ,password , phone } =req.body

   if(!fullName ) return res.status(400).send({message : " fullName is Required"})
   if(!email ) return res.status(400).send({message : " email is Required"})
    if(!isValidEmail(email)) return res.status(400).send({message : " Invalid Email"})
   if(!password ) return res.status(400).send({message : " password is Required"})
    if(!isValidPassword(password)) return res.status(400).send({message : " Invalid Password"})

        const existinguser = await userSchema.findOne({email})

    if(existinguser) return res.status(400).send({message : "User Already Exists"})

        const otp =generateOTP()
    const newUser = new userSchema({
        fullName,
        email,
        password,
        phone,
        otp,
        otpExpires:  new Date(Date.now() + 2 * 60 * 1000)
    })
  
  

await sendEmail({email , subject:"Email Verification" , otp })

    await newUser.save()

    res.status(201).send({message : "User Registered Successfully"})
        
    } catch (error) {
        res.status(500).send({message : "Internal Server Error"})
    }
 }


 

 module.exports={RegisterUSer}