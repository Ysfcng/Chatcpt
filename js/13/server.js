const express=require("express")
const app=express()
const port=3000
const path=require("path")
const userRouter=require("./users/user.js")

require("./db.js")
app.use(express.json())
app.use("/users",userRouter)
app.use(express.static(path.join(__dirname,"/public")))

app.listen(port,()=>{

console.log("uygulama basladi")
})
