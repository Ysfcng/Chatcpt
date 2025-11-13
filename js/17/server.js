const express=require("express")
const path=require("path")
const app=express()
const port=3000

const auth=require("./routers/auth.js")
const users=require("./routers/user.js")
app.use(express.json())
app.use(express.static(path.join(__dirname,"public")))

app.use("/auth",auth.router)
app.use("/users",users)

app.listen(port,()=>{
console.log("uygulama calisiyor")
})


