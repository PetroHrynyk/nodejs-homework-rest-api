const express = require("express");

const ctrl = require("../../controllers/auth");

const auth = require("../../middlewares/auth");



const router = express.Router();

router.post("/register", ctrl.register);
router.post("/login",  ctrl.login);
router.post("/logout", auth, ctrl.logout);

module.exports = router;
