const express=require("express")
const app=express()
const port=3000
const userRoute=require("./routes/users.js")
const y=console.log
const path=require("path")

app.use(express.json())
app.use(express.static(path.join(__dirname,"/public")))
app.use("/",userRoute)

app.listen(3000,()=>{
y(`uygulama ${port}da calisiyor`)
})
