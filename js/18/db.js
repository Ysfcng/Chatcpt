const {Pool}=require("pg")

const pool=new Pool({
user: "u0_a161",
database: "chatcptdb",
host: "localhost",
port:5432

});

module.exports=pool
