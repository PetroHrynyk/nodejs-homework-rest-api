const { Contact } = require("../../models");
const createError = require("http-errors");

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;
    const result = await Contact.findOneAndRemove({ id, owner: _id });
    if (!result) {
      throw createError(404, `Contact with ID: ${id} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContact;
