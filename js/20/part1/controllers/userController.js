const  User=require("../model/user.js")

module.exports={
async list(){
const result=await User.getAll();
return res.json(result.rows)

},
async update(req,res){
const {id,email,password}=req.body
if(req.user.role!=="admin")
return res.json({error:"sadece kendi hesabini duzenleyebilirsin"})

await User.update(id,email,password)
res.json({message:"kullanici guncellendi"})
},async delete(req,res){
const {id}=req.body
await User.del(id)
return res.json({message:"kullanici silindi"})
}




}
