const express=require("express")
const path=require("path")
const port=3000
const app=express()

const userRouter=require("./routers/user.js")
const auth=require("./routers/auth.js")

app.use(express.json())
app.use(express.static(path.join(__dirname,"public")))

app.use("/user",userRouter)
app.use("/auth",auth.router)


app.listen(port,()=>{
console.log(`uygulama ${port} portunda calisiyor`)
})
