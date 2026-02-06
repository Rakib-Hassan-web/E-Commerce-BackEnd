const nodemailer = require("nodemailer");

// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
       user: "rakibhassan.web@gmail.com",
    pass: "vrau iunk tijo amcf", // App password
  },
});

const sendEmail = async ({ email, subject, otp }) => {
 const info = await transporter.sendMail({
    from: "rakibhassan.web@gmail.com",
    to: email,
    subject: subject,
   
    html: `<b>Verify Otp ${otp}</b>`, // HTML version of the message
  });
};

module.exports = { sendEmail };