const bcrypt=require("bcryptjs")
const express=require("express")
const router=express.Router()
const db=require("../db.js")
const verify_token="123456789"
const jwt=require("jsonwebtoken")
router.post("/register",async(req,res)=>{
const{name,email,pass}=req.body

if((!email&&!name)||!pass)
return res.json({error:"email isim ve sifre gereklidir"})


await db.read()
const hashed=await bcrypt.hash(pass,10)
db.data.users.push({"id":Date.now().toString(),"name":name,"email":email,"pass":hashed})

db.write();
return res.json({message:"kullanici eklendi"})
})

router.post("/login",async(req,res)=>{
const {email,pass}=req.body
await db.read();
const user=await db.data.users.find(u=>u["email"]==email||u["name"]==email)
if(!user)
return res.json({error:"kullanici adi veya email hatali"})
const isMatch=await bcrypt.compare(pass,user["pass"])
if(!isMatch)
return res.json({error:"kullanici adi veya email hatali"})

const token=jwt.sign({id:user.id,email:user.email},verify_token,{expiresIn:"1h"})
res.json({message:"giris basarili",token})
})

function verifyToken(req,res,next){
const authHeader=req.headers["authorization"]
console.log(authHeader)
const token=authHeader&&authHeader.split(" ")[1]
if(!token)
return res.json({error:"giris yapin"})

jwt.verify(token,verify_token,(err,user)=>{
if(err)
return res.json({error:err})
req.user=user
next();
})

}

module.exports={router,verifyToken}
