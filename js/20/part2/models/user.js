const db = require("../db");

module.exports = {
  create(name, email, password, role) {
    return db.query(
      "INSERT INTO users (name,email,password,role) VALUES ($1,$2,$3,$4)",
      [name, email, password, role]
    );
  },

  findByEmail(email) {
    return db.query("SELECT * FROM users WHERE email=$1", [email])
      .then(r => r.rows[0]);
  },

  findById(id) {
    return db.query(
      "SELECT id,name,email,role FROM users WHERE id=$1",
      [id]
    ).then(r => r.rows[0]);
  },

  all() {
    return db.query("SELECT id,name,email,role FROM users ORDER BY id");
  },

  update(id, name, email) {
    return db.query(
      "UPDATE users SET name=$1,email=$2 WHERE id=$3",
      [name, email, id]
    );
  },

  delete(id) {
    return db.query("DELETE FROM users WHERE id=$1", [id]);
  },

  saveRefresh(id, token) {
    return db.query(
      "UPDATE users SET refresh_token=$1 WHERE id=$2",
      [token, id]
    );
  },

  findByRefresh(token) {
    return db.query(
      "SELECT * FROM users WHERE refresh_token=$1",
      [token]
    ).then(r => r.rows[0]);
  }
};
