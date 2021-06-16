const ctrl = require("../../../controllers/users");
const express = require("express");
const router = express.Router();
const guard = require("../../../helpers/guard");

router.post("/signup", ctrl.signup);
router.post("/login", ctrl.login);
router.post("/logout", guard, ctrl.logout);

module.exports = router;