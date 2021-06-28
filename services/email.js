const Mailgen = require("mailgen");
require("dotenv").config();

class EmailService {
  constructor(env, sender) {
    this.sender = sender;
    switch (env) {
      case "development":
        this.link = "http://localhost:3000";
        break;
      case "production":
        this.link = "link for production";
        break;
      default:
        this.link = "http://localhost:3000";
        break;
    }
  }
  #createTemplateVerificationEmail(verifyToken, email) {
    const mailGenerator = new Mailgen({
      theme: "cerberus",
      product: {
        name: "Hi System",
        link: this.link,
      },
    });
    const emails = {
      body: {
        intro: "Welcome to Hi System!",
        action: {
          instructions: "To get started with Hi System, please click here",
          button: {
            color: "#22BC66",
            text: "confirm your account",
            link: `${this.link}/api/users/verify/${verifyToken}`,
          },
        },
        outro:
          "Need help, or have question? Just reply to this email, we'd love to help you",
      },
    };
    return mailGenerator.generate(emails);
  }
  async sendVerifyEmail(verifyToken, email) {
    const emailHtml = this.#createTemplateVerificationEmail(verifyToken, email);
    const msg = {
      to: email,
      subject: "Your account is verify",
      html: emailHtml,
    };
    const result = await this.sender.send(msg);
    console.log(result);
  }
}
module.exports = EmailService;
