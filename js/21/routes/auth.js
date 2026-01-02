const router =require("express").Router()
const ctrl=require("../controllers/authController.js")
const validate=require("../middlewares/validate.js")
const {loginLimiter}=require("../middlewares/rateLimit.js")
const {
loginSchema,
registerSchema,
refreshSchema

}=require("../validators/authValidator.js")
router.post("/login",loginLimiter,validate(loginSchema),ctrl.login)
router.post("/register",validate(registerSchema),ctrl.register)
router.post("/refresh",validate(refreshSchema),ctrl.refresh)

module.exports=router
