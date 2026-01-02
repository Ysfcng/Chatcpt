const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const ACCESS_SECRET = "ACCESS_SECRET_123";
const REFRESH_SECRET = "REFRESH_SECRET_456";

exports.register = async (req, res) => {
  const { name, email, pass1, role } = req.body;
  if (!name || !email || !pass1)
    return res.status(400).json({ error: "Eksik alan" });

  const exist = await User.findByEmail(email);
  if (exist) return res.status(400).json({ error: "Email kayıtlı" });

  const hash = await bcrypt.hash(pass1, 10);
  await User.create(name, email, hash, role || "user");

  res.json({ message: "Kayıt başarılı" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findByEmail(email);
  if (!user) return res.status(404).json({ error: "Kullanıcı yok" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: "Şifre yanlış" });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    ACCESS_SECRET,
    { expiresIn: "1h" }
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  await User.saveRefresh(user.id, refreshToken);

  res.json({ token, refreshToken });
};

exports.refresh = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(400).json({ error: "Refresh token yok" });

  const user = await User.findByRefresh(refreshToken);
  if (!user) return res.status(403).json({ error: "Geçersiz token" });

  jwt.verify(refreshToken, REFRESH_SECRET, (err) => {
    if (err) return res.status(403).json({ error: "Token süresi dolmuş" });

    const newToken = jwt.sign(
      { id: user.id, role: user.role },
      ACCESS_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token: newToken });
  });
};

exports.verify = (req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth && auth.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token yok" });

  jwt.verify(token, ACCESS_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Token geçersiz" });
    req.user = user;
    next();
  });
};
