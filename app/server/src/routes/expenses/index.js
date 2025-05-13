const express = require("express");
const router = express.Router();
const authMiddleware = require("@middlewares/auth");

router.use(authMiddleware);

router.route("/").get(require("./get"));
router.route("/").post(require("./create"));
router.route("/").put(require("./edit"));
router.route("/:expenseId").delete(require("./delete"));
router.route("/export-all").get(require("./export-all"));

router.route("/category").get(require("./get-category"));
router.route("/category").post(require("./create-category"));
router.route("/category").put(require("./edit-category"));
router.route("/category/:categoryId").delete(require("./delete-category"));

router.route("/spent-today").get(require("./get-spent-today"));
router.route("/today").get(require("./get-today-expenses"));

module.exports = router;
