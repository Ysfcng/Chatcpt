const express=require("express")
const bcrypt=require("bcryptjs")
const  jwt=require("jsonwebtoken")
const pool=require("../db.js")

const router=express.Router()
const secret="123456789"


router.post("/login",async(req,res)=>{
const {email,password}=req.body
if(!password||!email){
return res.json({error:"email ve sifre gereklidir"})
}

const result= await pool.query("select * from users  where email=$1",[email])
//const result= await pool.query("select * from users ")
const user=result.rows[0]
console.log(result)
if(!user)
return res.json({error:"kullanici bulunamadi"})

const valid=await bcrypt.compare(password,user.password)

if(!valid)
return res.json({error:"sifre yanlis"})

const token =jwt.sign({id:user.id,email:user.email},secret,{expiresIn:"1h"})

return res.json({token})
})
router.post("/register",async(req,res)=>{
const {email,name,pass1}=req.body

if(!email||!name||!pass1)
return res.json({error:"lutfen gerekli alanlari doldurun"})

const hashed=await bcrypt.hash(pass1,10)
try{
await pool.query("INSERT INTO  users  (name,email,password) VALUES ($1, $2, $3) ",[name,email,hashed])
res.json({message:"kayit basarili"})
}
catch(err){
if(err.code=="23505")
return res.status(400).json({error:"bu eposta ,aten kayitli"})
return res.status(500).json({error:err})
}

})
async function verifyToken(req,res,next){
const auth=req.headers["authorization"]
const token=auth&&auth.split(" ")[1]
if(!token)
return res.status(400).json({error:"token yok"})

jwt.verify(token,secret,(err,user)=>{
if(err)
return res.status(403).json({error:"token yanlis"})

req.user=user
next();



})

}
module.exports={router,verifyToken}
