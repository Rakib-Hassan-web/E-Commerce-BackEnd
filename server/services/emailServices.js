const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "rakibhassan.web@gmail.com",
    pass: "vrau iunk tijo amcf" ,
  },
});

const sendEmail = async ({ email, subject, otp,template }) => {
  try {
    await transporter.sendMail({
      from: '"E-Commerce" <rakibhassan.web@gmail.com>',
      to: email,
      subject,
      html: template({  otp }),
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email error:", error);
  }
};

module.exports = { sendEmail };