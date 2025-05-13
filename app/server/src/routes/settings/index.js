const express = require("express");
const router = express.Router();
const authMiddleware = require("@middlewares/auth");

router.use(authMiddleware);

router.route("/").get(require("./get"));
router.route("/currency").put(require("./edit-currency"));

module.exports = router;
