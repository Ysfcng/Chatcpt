const user=require("../model/user.js")

module.exports={
del:async function(req,res){
const {id}=req.body
user.remove(id)
res.json({message:"kullanici silindi"})
},
update:async function(req,res){
const  {id,email,password}=req.body
user.update(id,email,password)
res.json({message:"kullanici guncellendi"})
},
list:async function(){
const result=await user.getAll();
res.json(result.rows)


}



}
