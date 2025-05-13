const express = require("express");
const router = express.Router();
const authMiddleware = require("@middlewares/auth");

router.use(authMiddleware);
router.route("/pfp").put(require("./edit-pfp"));
router.route("/username").put(require("./edit-username"));

module.exports = router;
