const { User } = require("../../models");
const { verifyEmailSchema } = require("../../models/user");
const sendEmail = require("../../helpers/sendEmail");
const createVerifyEmail = require("../../helpers/createVerifyEmail");

const resendEmail = async (req, res, next) => {
  try {
    const { error } = verifyEmailSchema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = "missing required name field";
      throw error;
    }
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({
        status: "Error",
        code: 404,
        message: "Not found",
      });
    }
    if (user.verify) {
      res.status(400).json({
        status: "Error",
        code: 400,
        message: "User already verify",
      });
    }
    const mail = createVerifyEmail(email, user.verificationToken);
    await sendEmail(mail);
    res.json({
      message: "Email verify resend",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resendEmail;