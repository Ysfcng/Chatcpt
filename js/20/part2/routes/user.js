const router = require("express").Router();
const auth = require("../controllers/authController");
const authorize = require("../middlewares/authorize");
const user = require("../controllers/userController");

router.get("/", auth.verify, authorize(["admin"]), user.list);
router.put("/:id", auth.verify, user.update);
router.delete("/:id", auth.verify, authorize(["admin"]), user.delete);

module.exports = router;
