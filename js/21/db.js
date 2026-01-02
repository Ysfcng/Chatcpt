const {Pool}=require("pg")
const pool=new Pool({
host:"localhost",
port:5432,
user:process.env.PGUSER||"u0_a161",

database:process.env.PGDATABASE||"chatcptdb",

})

pool.query("select 1").then(()=>{
console.log("calisiyor")
}).catch((err)=>{
console.log(err+" err")

})
