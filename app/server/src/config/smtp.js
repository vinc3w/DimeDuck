const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

module.exports = (to, subject, html) => {
  transporter.sendMail({
    from: process.env.SMTP_FROM,
    to, subject, html
  });
}
