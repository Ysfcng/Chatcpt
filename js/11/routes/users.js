const express=require("express")
const router=express.Router()
const users=[]
const path=require("path")


router.get("/",(req,res)=>{

res.sendFile(path.join(__dirname,"../public/form.html"))
})

router.get("/users",(req,res)=>{
res.json(users)
})

router.post("/users",(req,res)=>{
const name=req.body.username
console.log(req.body)
if(!name){
return res.json({error:"isim yok"})
}
users.push(name)
return res.json({message:"isim ekledi",username:users[users.length-1]})
})

module.exports=router
