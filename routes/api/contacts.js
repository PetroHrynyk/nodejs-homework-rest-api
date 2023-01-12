const express = require("express");

const ctrl = require("../../controllers/contacts");

const auth = require("../../middlewares/auth");

const router = express.Router();

router.get("/", auth, ctrl.getAll);

router.get("/:id", auth, ctrl.getById);

router.post("/", auth, ctrl.add);

router.put("/:id", auth, ctrl.updateById);

router.patch("/:id/favorite", auth, ctrl.updateFavorite);

router.delete("/:id", auth, ctrl.deleteContact);

module.exports = router;
