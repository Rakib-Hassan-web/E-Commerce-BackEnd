const userSchema = require("../models/userSchema")
const { sendEmail } = require("../services/emailServices")
const emailtemplate = require("../services/emailTemplate")
const { generateOTP } = require("../services/helpers")
const { isValidEmail, isValidPassword } = require("../services/validation")

// -----------reg--------------
const RegisterUSer = async (req, res) => {
  try {
    const { fullName, email, password, phone } = req.body;

    if (!fullName) return res.status(400).send({ message: "fullName is Required" });
    if (!email) return res.status(400).send({ message: "email is Required" });
    if (!isValidEmail(email)) return res.status(400).send({ message: "Invalid Email" });
    if (!password) return res.status(400).send({ message: "password is Required" });
    if (!isValidPassword(password)) return res.status(400).send({ message: "Invalid Password" });

    const existinguser = await userSchema.findOne({ email });
    if (existinguser) return res.status(400).send({ message: "User Already Exists" });

    const otp = generateOTP();

    const newUser = new userSchema({
      fullName,
      email,
      password,
      phone,
      otp,
      otpExpires: new Date(Date.now() + 2 * 60 * 1000),
    });

    await newUser.save(); 

    await sendEmail({
      email,
      subject: "Email Verification",
      otp,
      template: emailtemplate,
     
    });

    res.status(201).send({ message: "User Registered Successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};


// -----------verifyOTP--------------

const verifyOTP = async (req,res)=>{

  const{ otp ,email}=req.body

  if(!otp) return res.status(400).send({ message: "OTP is required"})
  if(!email) return res.status(400).send({ message: "Email is required"})

    const user = await userSchema.findOne({
      email,
       otp: Number(otp),
      otpExpires: { $gt: new Date()},
      isverified:false,
    })

  if(!user) return res.status(400).send({ message: "Invalid or Expired OTP" })

     user.isverified=true
     user.otp=null
     user.otpExpires=null
     await user.save()
  

     res.status(200).send({ message: "OTP Verified Successfully" })


}

 

 module.exports={RegisterUSer,verifyOTP}