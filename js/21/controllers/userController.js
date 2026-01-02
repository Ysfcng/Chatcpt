const User=require("../models/user.js")
const AppError=require("../utils/AppError.js")

exports.list=async (req,res,next)=>{
try{
const result=await User.all()
res.json(result.rows)
}catch(err){
next(err)
}
}
exports.update=async(req,res,next)=>{
try{
const {id}=req.params
const {name,email}=req.body
if(req.user.role!="admin"&&req.user.id!=id)
throw new AppError("yetkin yok",403)
await User.update(id,name,email)
res.json({message:"kullanici guncellendi"})

}catch(err){
next(err)
}

}
exports.delete=async(req,res,next)=>{
try{
const {id}=req.params
await User.delete(id)
res.json({message:"kullanici silindi"})
}
catch(err){
next(err)
}

}
