const express=require("express")
const path=require("path")
const port=3000
const app=express()

const{router:authRouter}=require("./routes/auth.js")
const userRouter=require("./routes/user.js")

app.use(express.json())

app.use(express.static(path.join(__dirname,"public")))
app.use("/auth",authRouter)
app.use("/user",userRouter)

app.listen(port,()=>{
console.log("uygulama calisiyor")

})
