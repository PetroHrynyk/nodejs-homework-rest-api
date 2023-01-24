const { User } = require("../../models");
const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const sendEmail = require("../../helpers/sendEmail");
const createVerifyEmail = require("../../helpers/createVerifyEmail");
const { nanoid } = require("nanoid");

const {joiRegisterSchema} = require("../../models/user");

const register = async (req, res, next) => {
    try {
        const { error } = joiRegisterSchema.validate(req.body);
        if (error) {
          error.status = 400;
          error.message = "missing required name field";
          throw error;
        }
        const { password, email, subscription } = req.body;
        const user = await User.findOne({email});
        if (user) {
            throw new Conflict("Email in use")
        }
        // const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const hashPassword = await bcrypt.hash(password, 10);
        const avatarURL = gravatar.url(email);
        const verificationToken = nanoid();
        const result = await User.create({ password: hashPassword, email, subscription, avatarURL, verificationToken });

        const mail = createVerifyEmail(email, verificationToken);
        await sendEmail(mail);

        res.status(201).json({
            Status: "success",
            code: 201,
            data: {
                user: {
                    email: result.email,
                    subscription: result.subscription
                }
            }
        })
    
    } catch (error) {
        next(error);
    }
};

module.exports = register;