const ctrl = require("../../../controllers/users");
const express = require("express");
const router = express.Router();
const upload = require("../../../helpers/upload");
const guard = require("../../../helpers/guard");

router.post("/signup", ctrl.signup);
router.post("/login", ctrl.login);
router.post("/logout", guard, ctrl.logout);
router.patch("/avatars", guard, upload.single("avatar"), ctrl.avatars);

router.get("/verify/:token", ctrl.verify);
router.post("/verify", ctrl.repeatEmailVerification);

module.exports = router;
