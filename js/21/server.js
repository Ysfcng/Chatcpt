const express=require("express")
const path=require("path")
const fs=require("fs")
const morgan=require("morgan")

const port=3000
const app=express()

const authRoutes=require("./routes/auth.js")
const userRoutes=require("./routes/user.js")
const errorHandler=require("./middlewares/errorHandler.js")

const logStream=fs.createWriteStream(path.join(process.cwd(),"access.log"),{flags:"a"})
app.use(morgan("combined",{stream:logStream}))

app.use(express.json())

app.use("/auth",authRoutes)
app.use("/user",userRoutes)

app.use(errorHandler)

app.listen(port,()=>{
console.log("uygulama calisiyor")

})
