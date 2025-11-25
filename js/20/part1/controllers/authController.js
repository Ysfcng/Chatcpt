const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const user=require("../models/user.js")

module.exports={
async register(req,res)=>{
const {email,name,password,role}=req.body

if(!email||!name||!password){
return res.json({error:"email isim ve sifre zorunludur"})
}
const isRegistered=await user.findByEmail(email)
if(isRegistered){
return res.json({error:"bu email zaten kayitli"})
}

const hashed=await bcrypt.hash(password,10)
user.createUser(email,name,hashed,role||"user")
res.json({message:"kayit basarili"})
},
async login(req,res){
const {email,password}=req.body
if(!email||!password){
return res.json({error:"email ve sifre gereklidir"})
}
const  User=await user.findByEmail(email)
if(!User){
return res.json({error:"kullanici bulunamadi"})
}
const isValid=await bcrypt.compare(password,user.password)
if(!isValid)
return res.json({error:"email veya sifre hatalidir"})

const token=jwt.sign({id:User.id,role:User.role},secret,{expiresIn:"1h"})
res.json({token})

},
async verifyToken(req,res,next){
const {token}=req.body
if(!token)return res.json({error:"token yok"})
jwt.verify(token,secret,(err,user)=>{
if(err)return res.status(403).json({error:"token gecersiz"})
req.user=user
next();
})

}



}
