const {Pool}=require("pg")

const pool=new Pool({
host:"localhost",
user:process.env.USER,
port:5432,
database:"chatcptdb"
})

module.exports=pool
