const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        
    },
    phone:{
        type:String
    },
    role:{
        type:String,
        default:"user",
        enum : ["user" , "admin" ,]
    },
    isverified: false,

    otp:{
        type:Number,
        default:null
    },
    otpExpires:{
        type:Date,
    }

},
{timestamps:true})


userSchema.pre("save", async function () {
  const user = this;
  if (!user.isModified("password")) {
    return;
  }

  try {
    user.password = await bcrypt.hash(user.password, 10);
  } catch (err) {}
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports =mongoose.model( "User" ,userSchema)