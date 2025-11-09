const express=require("express")
const app=express()
const path=require("path")
const port=3000
const userRouter=require("./users/user.js")
const authRouter=require("./users/auth.js").router


app.use(express.json())
app.use(express.static(path.join(__dirname,"public")))


app.use("/users",userRouter)
app.use("/auth",authRouter)

app.listen(port,()=>{
console.log("uygulama portda calisiyor")
})
