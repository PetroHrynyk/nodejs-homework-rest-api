const express = require("express");

const ctrl = require("../../controllers/users");
const auth = require("../../middlewares/auth");

const router = express.Router();
router.get("/current", auth, ctrl.getCurrent);
module.exports = router;
