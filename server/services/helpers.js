var jwt = require('jsonwebtoken');

// ----------------otp Genarator----------------

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};


// ----------acc_token Generate---------------

const GenerateACCTkn=(user)=>{
  return jwt.sign({
 
    _id : user._id,
    email:user.email,
    role:user.role

}, process.env.JWT_SEC , { expiresIn: '1h' });
}

 // ----------refresh_token Generate---------------

const GenerateREFR_Tkn=(user)=>{
  return jwt.sign({

    _id : user._id,
    email:user.email,
    role:user.role
}
, process.env.JWT_SEC , { expiresIn: '10d' });
}


const verifytoken = (token)=>{
  try {
    const decoded = jwt.verify(token, process.env.JWT_SEC)
    return decoded
  } catch (error) {
     return null
  }
}


module.exports= {generateOTP, GenerateACCTkn, GenerateREFR_Tkn, verifytoken}