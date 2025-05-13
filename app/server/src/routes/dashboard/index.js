const express = require("express");
const router = express.Router();
const authMiddleware = require("@middlewares/auth");

router.use(authMiddleware);

router.route("/available").get(require("./get-available"));
router.route("/no-of-expenses").get(require("./get-no-of-expenses"));
router.route("/total-expenses").get(require("./get-total-expenses"));
router.route("/total-expenses-pie-chart").get(require("./get-total-expenses-pie-chart"));
router.route("/top-expenses").get(require("./get-top-expenses"));
router.route("/day-to-expenses-line-chart").get(require("./get-day-to-expenses-line-chart"));

module.exports = router;
