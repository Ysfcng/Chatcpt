// db.js
const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");

// JSON dosyasını kullan
const adapter = new JSONFile("database.json");
const db = new Low(adapter,{users:[]});

// Başlatma fonksiyonu
async function initDB() {
  await db.read();
  db.data ||= { users: [] }; // Eğer dosya boşsa varsayılan veriyi ekle
  await db.write();
}

// Uygulama başlarken veritabanını başlat
initDB();

module.exports = db;
