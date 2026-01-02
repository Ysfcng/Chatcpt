const router=require("express").Router()
const authController=require("../controllers/authController.js")
const userController=require("../controllers/userController.js")
const authorize=require("../middlewares/authorize.js")

router.get("/",authController.verify,authorize(["admin"]),userController.list)
router.put("/:id",authController.verify,userController.update)
router.delete("/:id",authController.verify,authorize(["admin"]),userController.delete)
module.exports=router
