const express=require("express")
const app= express()
const port =3000
const y=console.log

const users = [{ name: "Yusuf" }, { name: "Ahmet" }, { name: "Zeynep" }];

app.use(express.json())

app.post("/greet",(req,res)=>{
const name=req.body.name
res.send(`Express seni selamliyor ${name}`)
})
app.get("/users",(req,res)=>{
res.json(users)
})

app.listen(port,()=>{

y("lryhhg")

})
