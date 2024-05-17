const nodeMailer = require("nodemailer");

exports.sendToUserMail = async (mailDetails) => {
  try {
    const mailTransport = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: "mailforproject96@gmail.com",
        pass: "poyhupnhjplfpsqc",
      },
    });

    mailTransport.sendMail(mailDetails);
  } catch (error) {
    console.log(error);
  }
};
