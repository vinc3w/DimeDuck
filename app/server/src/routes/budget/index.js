const express = require("express");
const router = express.Router();
const authMiddleware = require("@middlewares/auth");

router.use(authMiddleware);

router.route("/").get(require("./get"));
router.route("/").post(require("./set"));
router.route("/").put(require("./edit"));

router.route("/available").get(require("./get-available"));

module.exports = router;
