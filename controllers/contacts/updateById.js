const { Contact } = require("../../models");
const { joiSchema } = require("../../models/contact");
const createError = require("http-errors");

const updateById = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = "missing field";
      throw error;
    }
    const { id } = req.params;
    const { _id } = req.user;
    const result = await Contact.findOneAndUpdate(
      { id, owner: _id },
      req.body,
      { new: true }
    );
    console.log(result);
    if (!result) {
      throw createError(404, `Contact with ID: ${id} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
