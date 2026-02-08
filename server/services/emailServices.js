const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "rakibhassan.web@gmail.com",
    pass: process.env.APP_PASS ,
  },
});

const sendEmail = async ({ email, subject, otp,template ,forgettemp ,fullName }) => {
  try {
    await transporter.sendMail({
      from: '"E-Commerce" <rakibhassan.web@gmail.com>',
      to: email,
      subject,
      html: template ? template({  otp }) : forgettemp({  otp,fullName }),
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email error:", error);
  }
};

module.exports = { sendEmail };