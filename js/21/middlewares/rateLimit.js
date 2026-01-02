const rateLimit=require("express-rate-limit")

const loginLimiter=rateLimit({
windowMs:60*1000,
max:5,
standardHeaders:true,
legacyHeaders:false,
message:{
success:false,
message:"cok fazla giris denemesi 1 dakika sonra tekrar deneyin "
}


})
module.exports={loginLimiter}
