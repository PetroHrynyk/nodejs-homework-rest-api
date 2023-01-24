const { User } = require("../../models");
const { Unauthorized } = require("http-errors");
const { joiLoginSchema } = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { error } = joiLoginSchema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = "missing required name field";
      throw error;
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const passwordCompare = bcrypt.compareSync(password, user.password);
    if (!user ||  !user.verify || !passwordCompare) {
      throw new Unauthorized("Email is wrong or not verify, or password is wrong");
    }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "5h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
      status: "success",
      code: 200,
      token: token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
