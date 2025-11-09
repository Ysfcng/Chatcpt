const express=require("express")
const router=express.Router()
const db=require("../db.js")
const {verifyToken}=require("./auth.js")

router.get("/",verifyToken,async (req,res)=>{
res.json(db.data.users.map(u=>({id:u.id,name:u.name,email:u.email})))

})
module.exports=router;
