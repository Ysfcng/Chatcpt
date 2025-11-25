const db=require("../db/index.js")
module.exports={
async createUser(name,email,hash,role="user"){
return db.query("insert into users (name,email,password,role) values ($1 $2 $3 $4)",[name,email,hash,role])


},
async findByEmail(email){
let result= await db.query("select * from users where email=$1",[email])
return result.rows[0]
},
async findById(id){
let result=await  db.query("select * from users where id=$1",[id])
return result.rows[0]
},
async getAll(){
return db.query("select id,email,name ,role from users order by id asc")
},
async update(id,name,email){
return db.query("update users set name=$1,email=$2 where id=$3",[name,email,id])

},
async remove(id){
return db.query("delete from users where id=$1",[id])

}

}
