const express=require("express")
const router=express.Router()
const db=require("../db.js")




router.get("/users",(req,res)=>{
db.all("SELECT * FROM USERS",(err,rows)=>{
if(err){
res.status(500).json({"error":err.message})
}
res.json({rows})


})
})


router.post("/users",(req,res)=>{
let name=req.body.name
let email=req.body.email

if(!email||!name){
res.status(400).json({error:"isim ve email zorunlu"})
}

const sql="INSERT INTO users (name,email) Values (?,?)"

db.run(sql,(err)=>{
if(err){
res.status(500).json({error:err.message})
}
res.json({message:"kullanici eklendi"})

})

})

router.put("/users",(req,res)=>{
const {email,name,id}=req.body

const sql="UODATE users SET  name = ? email = ? WHERE id = ?"

db.run(sql,[name ,email,id],(err)=>{
if(err)
res.status(500).json({error:err.message})

res.status(200).json({message:"kullanici guncellendi"})
})

})



router.delete("/users",(req,res)=>{
const {id}=req.body
const sql="DELETE FROM users WHERE id = ?"

db.run(sql,id,(err)=>{
if(err)
res.status(500).json({error:err.message})
res.status(200).json({message:"kullanici silindi"})
})


})
module.exports=router
