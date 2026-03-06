import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "fbdd2bd57022ef",
    pass: "cd605702dd998f"
  },
});

const sendEmail = async (to, subject, text) => {
  await transporter.sendMail({
    from: '"My App" <no-reply@myapp.com>',
    to,
    subject,
    text,
  });
  
};

export default sendEmail;