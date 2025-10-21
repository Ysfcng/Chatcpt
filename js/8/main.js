const  express=require("express")
const app=express()
const port=3000

app.get("/",(req,res)=>{
res.send("Merhaba Express")
})
app.get("/about",(req,res)=>{
res.send("bu bir express.js uygulamasidir")
})
app.listen(port)
