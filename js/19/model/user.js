const db=require("../db/index.js")
module.exports={

createUser:async function(email,name,hash){
return db.query("insert into users (name,email,password) values ($1 $2 $3 )",[name,email,hash])
},

findByEmail:async function(email){
const result=await db.query("select * from users where email=$1",[email])
return result.rows[0]
},

gelAll:async function(){
return db.query("select id,name,email from users order by id asc")
},

update:async function(id,email,name){
return db.query("update users set name=$1 email=$2 where id=$3",[name,email,id])
},

remove:async function(id){
return db.query("delete from users where id=$1",[id])

}
}
