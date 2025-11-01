const express=require("express")
const router=express.Router()
const db=require("../db.js")




router.get("/",async (req,res)=>{
await db.read()
res.json(db.data.users)
})

router.post("/",async (req,res)=>{
let name=req.body.name
let email=req.body.email

console.log(req.body)
if(!email||!name){
res.status(400).json({error:"isim ve email zorunlu"})
}

await db.read()
db.data.users.push({"id":Date.now().toString(),name,email})
await db.write()

res.json({message:"kullanici eklendi",users:db.data.users})
})




router.put("/",async (req,res)=>{
const {email,name}=req.body
const id=req.body.id
await db.read()

const user=db.data.users.find(u=>u.id==id)
if(!user)
return res.status(400).json({error:"kullanici bulunamadi"})

if(name)user.name=name
if(email)user.email=email

await db.write()
res.json({message:"kullanici guncellendi"})
})



router.delete("/",async (req,res)=>{
const id=req.body.id
await db.read()
console.log(db.data.users)
db.data.users=db.data.users.filter(x=>x.id!==id)
db.write()
res.json({message:"kullanici silindi"})
})
module.exports=router
