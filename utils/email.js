const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    console.log(email, subject, text);
    console.log(process.env.HOST);
    console.log(process.env.SERVICE);
    console.log(process.env.USER);
    console.log(process.env.PASS);
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: 587,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: "pranavverma550@gmail.com",
      subject: subject,
      text: text,
    });
    console.log("email sent successfully");
  } catch (error) {
    console.log("email not sent");
  }
};

module.exports = sendEmail;
