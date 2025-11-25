const express=require("express")
const {list,update,delete:del}=require("../controllers/userController.js")
const {verifyToken}=require("./auth.js")
const authorize=require("../middlewares/authorize.js")

const router=express.Router()
router.get("/",verifyToken,authorize(["admin"]),list)
router.put("/",verifyToken,update)
router.delete("/",verifyToken,authorize(["admin"]),del)


module.exports=router
