const joi=require("joi")
exports.registerSchema=joi.object({
name:joi.string().min(2).required(),
email:joi.string().email().required(),
pass1:joi.string().min(6).required(),
role:joi.string().valid("admin","user").required()

})
exports.loginSchema=joi.object({
email:joi.string().email().required(),
password:joi.string().required()
})
exports.refreshSchema=joi.object({
refreshToken:joi.string().required()
})
