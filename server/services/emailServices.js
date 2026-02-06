const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "rakibhassan.web@gmail.com",
    pass: process.env.APP_PASS, 
  },
});

const sendEmail = async ({ email, subject, otp }) => {
  try {
    await transporter.sendMail({
      from: '"E-Commerce" <rakibhassan.web@gmail.com>',
      to: email,
      subject,
      html: `<h3>Your OTP Code</h3><p><b>${otp}</b></p>`,
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email error:", error);
  }
};

module.exports = { sendEmail };