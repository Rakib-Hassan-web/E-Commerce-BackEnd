const userSchema = require("../models/userSchema")
const { uplodecloudinary, deletfromCloudinary } = require("../services/cloudinaryServices")
const {
  sendEmail
} = require("../services/emailServices")
const emailtemplate = require("../services/emailTemplate")
const {
  generateOTP,
  GenerateACCTkn,
  GenerateREFR_Tkn,
  GenerateFORGET_Tkn,
  generateResetPassToken
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
    if (!user.isverified) return res.status(400).send({message: "User Not Verified"})

    const ACC_TKN =  GenerateACCTkn(user)
    const REF_TKN =  GenerateREFR_Tkn (user)

      
      res.cookie( "X-AS-Token" ,ACC_TKN)
      res.cookie( "X-RF-Token" ,REF_TKN)

    res.cookie('X-AS-Token', ACC_TKN, {
     httpOnly: false,
     secure: false,   
     maxAge:3600000
     });

      res.cookie('X-RF-Token', REF_TKN, {
     httpOnly: false,
     secure: false,   
     maxAge:864000000
     });



  res.status(200).send({message: "Login Successful", })


    
  } catch (error) {
  res.status(500).send({ message: "Internal Server Error" });
  console.log(error);
  
  }
}


//-------------------forget pass-------------


const forgetpass = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).send({ message: "Invalid Email" });
    }

    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "User Not Registered" });
    }

     const { resetToken, hashedToken } = generateResetPassToken();
    user.resetPassToken = hashedToken;
    user.resetExpire = Date.now() + 2 * 60 * 1000;
    await user.save();
    const RESET_PASSWORD_LINK = `${process.env.CLIENT_URL || "http://localhost:3000"
      }/auth/resetpass/${resetToken}`;
    sendEmail({
      email,
      subject: "Reset Your Password",
      otp: RESET_PASSWORD_LINK,
      template: emailtemplate.forgetPassTemp,
      fullName: user.fullName
    });

    res.status(200).send({
      message: "Forget password email sent successfully"
    });

  } catch (error) {
    console.error("Forget password error:", error);
    res.status(500).send({
      message: "Failed to send reset email",
      error: error.message
    });
  }
};

// --------------user Get profile-------------

const GetUserProfile = async (req, res) => {


try {
  const userID = await userSchema.findById(req.user._id).select(" -password -otp -otpExpires -resetExpire -resetPassToken")

if(!userID) return res.status(404).send({message: "user not found"})

res.status(200).send({message: "user profile fetched successfully", user: userID})

  
} catch (error) {
  res.status(500).send({message: "Internal Server Error"})
  
  
}


}

// -------------- update user profile-----------


const updateUserProfile = async ( req, res)=>{

try {

    const {phone,fullName} = req.body;
    const userId = req.user._id;
    const avatar = req.file
  
const user = await userSchema.findById(userId).select("-password -otp -otpExpires -resetExpire -resetPassToken")

    if(avatar) {
       const imgPublicId = user.avatar.split("/").pop().split(".")[0];
     deletfromCloudinary(`avatar/${imgPublicId}`);
      const response =await uplodecloudinary(avatar ,"avatar")
     
      user.avatar =response.secure_url;
    }
    if(phone) user.phone =phone;
    if(fullName) user.fullName =fullName;

    
user.save()

    res.status(200).send({message:"user profile updated successfully" ,user})
  
} 
catch (error) {
  res.status(500).send({message: "Internal Server Error"})
}
}



module.exports = {
  RegisterUSer,
  verifyOTP,
  resendOTP,
  LoginUser,
  forgetpass,
  GetUserProfile,
  updateUserProfile,
}