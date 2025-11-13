const express = require("express");
const { verifyToken } = require("./auth.js");
const db = require("../db.js");

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  await db.read();
  console.log(1)
  res.json(
    db.data.users.map(u => ({
      id: u.id,
      email: u.email
    }))
  );
});

module.exports = router;
