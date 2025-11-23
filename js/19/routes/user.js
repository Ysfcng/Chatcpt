const express=require("express")
const router=express.Router()
const {list,update,del}=require("../controllers/userController.js")
const {verifyToken}=require("./auth.js")

router.get("/",verifyToken,list)
router.put("/",verifyToken,update)
router.delete("/",verifyToken,del)
module.exports=router
