const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const user=require("../model/user.js")

const secret="123456789"
 
module.exports={
register:async function(req,res){
const {email,name,pass1}=req.body

if(!name||!email||!pass1)
return res.json({error:"email sifre isim bos gecilemez"})

const exists=user.findByEmail(email)

if(exists)
return res.json({error:"bu eposta zaten kayitli"})

const hashed=await bcrypt.hash(password,10)
await user.createUser(user,email,hashed)

return res.json({messgae:"kullanici eklendi"})


},
login:async function(req,res){
const {email,password}=req.body
if(!email||!password)
return res.json({error:"kullanici ismi ve sifre gereklidir"})

const user=await user.findByEmail(email)

if(!user)
return res.json({error:"kullanici ismi veya email hatalidir"})

const isMatch=await bcrypt.compare(password,user.password)
if(!isMatch)
return res.json({error:"kullanici ismi veya email hatalidir"})

const token=jwt.sign({id:user.id},secret,{expiresIn:"1h"})
res.json({token})

},
 verifyToken:async function(req,res,next){
const auth=req.headers["authorization"]
const token=auth.split(" ")[1]
if(!token)
return res.json({error:"token yok"})

jwt.verify(token,secret,(err,user)=>{
if(err)
return res.json({error:"token yanlis"})
req.user=user
next();


})
}



}
