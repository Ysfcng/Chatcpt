const {Low}=require("lowdb")
const {JSONFile}=require("lowdb/node")

const adapter=new JSONFile("database.json")
const db=new  Low(adapter,{users:[]})

module.exports=db
