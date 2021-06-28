const sgMail = require("@sendgrid/mail");
const nodemailer = require("nodemailer");
require("dotenv").config();

class CreateSenderSendGrid {
  async send(msg) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    return await sgMail.send({
      ...msg,
      from: "Hi System <zenjunja91@gmail.com>",
    });
  }
}

class CreateSenderNodemailer {
  async send(msg) {
    const config = {
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "zenjunja91@gmail.com",
        pass: process.env.PASSWORD,
      },
    };
    const transporter = nodemailer.createTransport(config);
    return await transporter.sendMail({ ...msg, from: "zenjunja91@gmail.com" });
  }
}

module.exports = { CreateSenderNodemailer, CreateSenderSendGrid };
