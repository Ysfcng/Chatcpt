const express=require("express")
const path=require("path")
const y=console.log
const app=express()
const port=3000
const userRoute=require("./users/user.js")

app.use(express.json())
app.use(express.static(path.join(__dirname,"/public")))

app.use("/users",userRoute)
app.use("/",(req,res)=>{
res.sendFile(path.join(__dirname,"/public/index.html"))
})


app.listen(port,()=>{
y("uygulama calisiyor")
})




