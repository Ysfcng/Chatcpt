const express=require("express")
const router=express.Router()
const db=require("../db.js")

router.post("/",async(req,res)=>{
const param=req.body.searchQuery

let result=await db.data.users.find(x=>{

let user=x.name.toLowerCase()
let userEmail=x.email.toLowerCase()
let query=param.toLowerCase()
if(user.includes(query)||userEmail.includes(query))
return true
}
)
res.json(result)

})

module.exports=router;
