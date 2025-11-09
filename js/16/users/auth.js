const db=require("../db.js")
const express=require("express")
const router=express.Router()
const bcrypt=require("bcryptjs")
const jwt =require("jsonwebtoken")
const secret_key="12345678"

router.post("/register",async(req,res)=>{
const {email,password,name}=req.body

if(!name||!email||!password)
return res.json({error:"isim eposta ve email zorunlu"})

await db.read()

const emailExists=await db.data.users.find(u=>u.email==email)
if(emailExists)
return res.status(400).json({error:"email zaten var"})

const hashed=await bcrypt.hash(password,10)

db.data.users.push({id:Date.now().toString(),"name":name,"email":email,password:hashed})

return res.json({message:"kullanici eklendi"})
})

router.post("/login",async(req,res)=>{
const {email,password}=req.body
if(!password||!email)
return res.json({error:"kullanici bulunamadi"})

await db.read()
const user=db.data.users.find(u=>u.email==email)
const isMatch=bcrypt.compare(password,user?.password)
if(!user||!isMatch)
return res.status(400).json({error:"kullanici adi veya email hatali"})

const token=jwt.sign({id:user.id,email:user.email},secret_key,{expiresIn:"1h"})
res.json({message:"giris basarili",token})

})


function verifyToken(req,res,next){
const authHeader=req.headers["authorization"]

const token=authHeader&&authHeader.split(" ")[1]
if(!token)
return res.status(400).json({error:"panele erismek icin giris yapin"})

jwt.verify(token,secret_key,(err,user)=>{
if(err)
return res.json({error:"kullanici ismi gecersiz"})
req.user=user
next()

})
}
module.exports= {router,verifyToken}
