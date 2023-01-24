const sgMails = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMails.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const mail = { ...data, from: "hrynyk.petro@meta.ua" };
  await sgMails.send(mail);
  return true;
};

module.exports = sendEmail;