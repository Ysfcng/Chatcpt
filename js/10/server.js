const express=require("express")
const y=console.log
const app=express()
const port=3000
const  router=require("./routes/users.js")

app.use((req,res,next)=>{
y(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
next();
})

app.use(express.json())

app.use("/",router)










app.listen(3000,()=>{
y("server "+port+"ta calisiyor")
})
