const { User } = require("../../models");
const { NotFound } = require("http-errors");

const verify = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
      throw NotFound(404, "User not found");
    }
    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: "",
    });
    res.json({
      message: "Verify success",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verify;