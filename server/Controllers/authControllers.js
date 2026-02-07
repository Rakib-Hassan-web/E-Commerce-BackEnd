const userSchema = require("../models/userSchema")
const {
  sendEmail
} = require("../services/emailServices")
const emailtemplate = require("../services/emailTemplate")
const {
  generateOTP,
  GenerateACCTkn,
  GenerateREFR_Tkn
} = require("../services/helpers")
const {
  isValidEmail,
  isValidPassword
} = require("../services/validation")

// -----------registration--------------
const RegisterUSer = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      phone
    } = req.body;

    if (!fullName) return res.status(400).send({
      message: "fullName is Required"
    });
    if (!email) return res.status(400).send({
      message: "email is Required"
    });
    if (!isValidEmail(email)) return res.status(400).send({
      message: "Invalid Email"
    });
    if (!password) return res.status(400).send({
      message: "password is Required"
    });
    if (!isValidPassword(password)) return res.status(400).send({
      message: "Invalid Password"
    });

    const existinguser = await userSchema.findOne({
      email
    });
    if (existinguser) return res.status(400).send({
      message: "User Already Exists"
    });

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

    res.status(201).send({
      message: "User Registered Successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Internal Server Error"
    });
  }
};


// -----------verifyOTP--------------

const verifyOTP = async (req, res) => {
  try {
    const {
      otp,
      email
    } = req.body

    if (!otp) return res.status(400).send({
      message: "OTP is required"
    })
    if (!email) return res.status(400).send({
      message: "Email is required"
    })

    const user = await userSchema.findOne({
      email,
      otp: Number(otp),
      otpExpires: {
        $gt: new Date()
      },
      isverified: false,
    })

    if (!user) return res.status(400).send({
      message: "Invalid or Expired OTP"
    })

    user.isverified = true
    user.otp = null
    user.otpExpires = null
    await user.save()


    res.status(200).send({
      message: "OTP Verified Successfully"
    })


  } catch (error) {

    res.status(500).send({
      message: "Internal Server Error"
    });
  }

}


// ------------resendOTP-------------

const resendOTP = async (req, res) => {
  try {
    const {
      email
    } = req.body

    if (!email) return res.status(400).send({
      message: "Email is required"
    });


    const user = await userSchema.findOne({
      email,
      isverified: false,
    })
    if (!user) return res.status(400).send({
      message: "Invalid or Unverified User"
    })

    const otp = generateOTP();
    user.otp = otp
    user.otpExpires = new Date(Date.now() + 2 * 60 * 1000)

    await user.save();

    await sendEmail({
      email,
      subject: "Email Verification",
      otp,
      template: emailtemplate,

    });

    res.status(201).send({
      message: "OTP Resent Successfully"
    });



  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error"
    });

  }
}


// ------------login------------


const LoginUser = async( req,res)=> {
  try {

    const {email ,password} = req.body;

    

 if (!email) return res.status(400).send({message: "email is Required" });
 if (!isValidEmail(email)) return res.status(400).send({message: "Invalid Email" });

    if (!password) return res.status(400).send({ message: "password is Required" });
 if (!isValidPassword(password)) return res.status(400).send({ message: "Invalid Password"});



 const user = await userSchema.findOne({email})

   if (!user) return res.status(400).send({
      message: "User Not Registered"
    });

    const Pass_Match = await user.comparePassword(password)

    if (!Pass_Match) return res.status(400).send({message: "Wrong Password"})

    const ACC_TKN =  GenerateACCTkn(user)
    const REF_TKN =  GenerateREFR_Tkn (user)

      console.log(ACC_TKN);
      console.log("REF_TKN=" ,REF_TKN);
      
      res.cookie( "X-AS-Token" ,ACC_TKN)
      res.cookie( "X-RF-Token" ,REF_TKN)


  res.status(200).send({message: "Login Successful", })


    
  } catch (error) {
  res.status(500).send({ message: "Internal Server Error" });
  console.log(error);
  
  }
}




module.exports = {
  RegisterUSer,
  verifyOTP,
  resendOTP,
  LoginUser
}