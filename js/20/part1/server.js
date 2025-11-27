const path=require("path")
const express=require("express")
const app=express()
const port=3000;

const userRouter=require("./router/user.js")
const {router:authRouter}=require("./router/auth.js")

app.use(express.json())
app.use(express.static(path.join(__dirname,"public")))


app.use("/users",userRouter)
app.use("/auth",authRouter)

app.listen(port,()=>{
console.log("")
})
