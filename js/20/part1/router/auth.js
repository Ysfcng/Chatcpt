const express=require("express")
const {register,login,verifyToken}=require("../controllers/authController.js")

const router=express.Router()
router.post("/register",register)
router.post("/login",login)

module.exports={verifyToken,router}
