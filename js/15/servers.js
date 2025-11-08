const express=require("express")
const app=express()
const port=3000
const userRouter=require("./users/user.js")
const db=require("./db.js")
const path=require("path")
const searchRouter=require("./users/search.js")

app.use(express.json())

app.use(express.static(path.join(__dirname,"/public")))
app.use("/users",userRouter)
app.use("/search",searchRouter)


app.listen(port,()=>{
console.log("uygulama calisiyor")
})
