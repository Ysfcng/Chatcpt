const express=require("express")
const  router=express.Router()
const db=require("../db.js")


router.get("/",async (req,res)=>{
await db.read()
const users=await db.data.users
res.json(users)
})


router.post("/",async (req,res)=>{
await db.read()
const {user,email}=req.body
const id=db.data.users[db.data.users.length-1]?.id+1||1

if(!user||!email)
res.json({error:"kullanici ve email zorinlu"})

db.data.users.push({"name":user,"email":email,"id":id})
await db.write()

return res.json({message:"kullanoci eklendi"})
})


router.delete("/",async (req,res)=>{
const {id}=req.body
if(!id)
res.json({error:"kullanici id zorunlu"})

await db.read();
if(!db.data.users.some(x=>x.id==id))
return res.json({error:"kullanici id bulunamadi"})

db.data.users=db.data.users.filter(x=>x.id!=id)
db.write()

res.json({message:"kullanici silindi"})
})


router.put("/",async(req,res)=>{
const  {id,name,email}=req.body
console.log(id,email,name)

if(!id||!email||!name)
return res.json({error:"id email ve isim zorunlu"})
db.read();
let user=db.data.users.find(x=>x.id==id)
if(!user)
return res.json({error:"kullanici bulunamadi"})
user.name=name
user.email=email

await db.write()
res.json({message:"kullanici guncellendi"})


})

module.exports=router;
