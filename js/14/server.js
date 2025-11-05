const express=require("express")
const path=require("path")
const y=console.log
const port=3000
const userRouter=require("./users/user.js")



const app=express()

app.use(express.json())


app.use(express.static(path.join(__dirname,"public")))

app.use("/users",userRouter)

app.listen(port,()=>{

y(`uygulama ${port}ta calisiyor`)
})
