const express=require("express")
const router=express.Router()
const db=require("../db.js")

router.get("/",async (req,res)=>{
await db.read()
res.json(db.data.users)


})


router.post("/",async (req,res)=>{
const  {name,email}=req.body
await db.read()
const id=db.data.users.length

if(!name||!email){
return res.status(400).json({error:"kullanici adi ve email zorunlu"})
}
db.data.users.push({"id":id,name,email})

res.json({message:"kullanici eklendi"})
await db.write()
})


router.delete("/",async (req,res)=>{
const {id}=req.body
await db.read()

if(!id&&id!=0){
return res.status(400).json({error:"kullanici id zorunlu"})
}
if(!db.data.users.some(x=>x["id"]!=id))
return res.status(400).json({error:"kullanici id hatali"})

db.data.users=db.data.users.filter((x,i)=>i!==id)
await db.write()
res.json({message:"kullanici silindi"})
})

router.put("/",async (req,res)=>{
const {name,email,id}=req.body

if(!name||!email){
return res.status(400).json({error:"kullanici adi zorunlu"})
}

await db.read();
const user=db.data.users.find(x=>x[`name`]==name&&x[`email`]==email&&x["id"]==id)

if(!user)
return res.status(400).json({error:"kullanici adi veya email hatali"})

user["name"]=name
user["email"]=email
return  res.json({message:"kullanici guncellendi"})
})


module.exports=router
