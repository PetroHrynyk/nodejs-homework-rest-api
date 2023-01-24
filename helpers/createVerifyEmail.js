require("dotenv").config();

const { BASE_URL } = process.env;

const createVerifyEmail = (email, verificationToken) => {
  const mail = {
    to: email,
    subject: "Verify mail",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Verify email</a>`,
  };
  return mail;
};

module.exports = createVerifyEmail;