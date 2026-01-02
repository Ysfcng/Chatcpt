console.log("🔥 DOĞRU errorHandler ÇALIŞIYOR");

module.exports=(err,req,res,next)=>{
const status=err.statusCode||500;
res.status(status).json({
success:true,
message:err.message||"sunucu hatasi"


})
}
