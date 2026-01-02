const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const AppError = require("../utils/AppError");

const ACCESS_SECRET = "ACCESS_SECRET_123";
const REFRESH_SECRET = "REFRESH_SECRET_456";

exports.register = async (req, res, next) => {
  try {
    const { name, email, pass1, role } = req.body;

    const exist = await User.findByEmail(email);
    if (exist) throw new AppError("Email zaten kayıtlı", 400);

    const hash = await bcrypt.hash(pass1, 10);
    await User.create(name, email, hash, role || "user");

    res.json({ success: true, message: "Kayıt başarılı" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByEmail(email);
    if (!user) throw new AppError("Kullanıcı bulunamadı", 404);

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new AppError("Şifre yanlış", 401);

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
  } catch (err) {
    next(err);
  }
};

exports.refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    const user = await User.findByRefresh(refreshToken);
    if (!user) throw new AppError("Geçersiz refresh token", 403);

    jwt.verify(refreshToken, REFRESH_SECRET, (err) => {
      if (err) return next(new AppError("Refresh token süresi dolmuş", 403));

      const newToken = jwt.sign(
        { id: user.id, role: user.role },
        ACCESS_SECRET,
        { expiresIn: "1h" }
      );

      res.json({ token: newToken });
    });
  } catch (err) {
    next(err);
  }
};

exports.verify = (req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth && auth.split(" ")[1];
  if (!token) return next(new AppError("Token yok", 401));

  jwt.verify(token, ACCESS_SECRET, (err, user) => {
    if (err) return next(new AppError("Token geçersiz", 403));
    req.user = user;
    next();
  });
};
