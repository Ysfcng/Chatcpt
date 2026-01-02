const router = require("express").Router();
const ctrl = require("../controllers/authController");
const { loginLimiter } = require("../middlewares/rateLimit");

router.post("/register", ctrl.register);
router.post("/login", loginLimiter, ctrl.login);
router.post("/refresh", ctrl.refresh);

module.exports = router;
