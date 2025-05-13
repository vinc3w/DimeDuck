const express = require("express");
const router = express.Router();

router.route("/log-in").post(require("./log-in"));
router.route("/register").post(require("./register"));
router.route("/authorize-token").post(require("./authorize-token"));
router.route("/log-out").post(require("./log-out"));
router.route("/send-password-reset-email").post(require("./send-password-reset-email"));
router.route("/reset-password").put(require("./reset-password"));

module.exports = router;
