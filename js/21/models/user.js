const db=require("../db.js")
module.exports={
async create(name,email,password,role){
return db.query("insert into users (name ,email,password,role) values ($1,$2,$3,$4)",[name,email,password,role])
},
async findByEmail(email){
const result=await  db.query("select * from users where email=$1",[email])
return result.rows[0]
},
async findById(id){
const result=await  db.query("select * from users where id=$1",[id])
return result.rows[0]
},async all(){
return db.query("select * from users order by id asc")

},async update(id,name,email){
return db.query("update user set name=$1,email=$2 where id=$3",[name,email,id])
},async delete(id){
return db.query("delete from users where id=$1",[id])
},async saveRefresh(id,token){
return db.query("update users set refresh_token=$1 where id=$2",[token,id])

},async findByRefresh(token){
const result=await db.query("select * from users where refreshToken=$1",[token])
return result.rows[0]
}


}
