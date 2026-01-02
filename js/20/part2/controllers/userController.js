const User = require("../models/user");

exports.list = async (req, res) => {
  const users = await User.all();
  res.json(users.rows);
};

exports.update = async (req, res) => {
  if (req.user.role !== "admin" && req.user.id != req.params.id)
    return res.status(403).json({ error: "Yetkisiz" });

  const { name, email } = req.body;
  await User.update(req.params.id, name, email);
  res.json({ message: "Güncellendi" });
};

exports.delete = async (req, res) => {
  await User.delete(req.params.id);
  res.json({ message: "Silindi" });
};
