const express=require("express")
const router=express.Router()

const users=[{name:"Ahmet"}
,{name:"Mehmet"},{name:"Yusuf"}]

router.get("/",(req,res)=>{
res.json(users)
})

router.post("/",(req,res)=>{
	console.log("isim ekksik")
	const name=req.body.name
	if(!name){
		console.log("isim ekksik")
		return  res.status(400)
		.json({error:"kullanici ismi eksik"})
	}
	users.push({"name":name})
	return res.json({message:"kullanici ismi eklendi"})

})


module.exports=router
