//db.js

const  {Low}=require("lowdb")
const {JSONFile} =require("lowdb/node")

const adapter =new JSONFile("database.json")
const db =new Low(adapter,{users:[]})

async function initDB() {
  await db.read();
  db.data ||= { users: [] }; // Eğer dosya boşsa varsayılan veriyi ekle
  await db.write();
}


initDB();
module.exports =db;
