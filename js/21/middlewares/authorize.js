const AppError=require("../utils/AppError.js")
module.exports=(roles=[])=>{
return (req,res,next)=>{
if(!req.user){
return next(new AppError("yetkilendirme yok",401))
}
if(!roles.includes(req.user.role)){
return next(new AppError("bu islem icin yetkin yok",401))
}
next();
}

}
