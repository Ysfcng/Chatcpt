const express=require("express")
const router=express.Router()
const {verifyToken}=require("./auth.js")


router.get("/",verifyToken,async(req,res)=>{
const result=await pool.query("select id,name,email from users")

res.json({result})

})

router.put("/",async(req,res)=>{
const {name,email,id}=req.body

await pool.query("update users set name=$1 email=$2 id=$3",[name,email,id])
res.json({message:"kullanici guncellendi"})
})
router.delete("/",verifyToken,async(req,res)=>{
const {id}=req.body
await pool.query("delete from users where id=$1",[id])
res.json({message:"kullanici silindi"})
})
module.exports= router
