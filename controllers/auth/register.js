const { User } = require("../../models");
const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");

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
        const hashPassword = bcrypt.hash(password, 10);
        const result = await User.create({ password: hashPassword, email, subscription });
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