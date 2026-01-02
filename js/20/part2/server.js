const express = require("express");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");

const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user.js");

const app = express();

const logStream = fs.createWriteStream(
  path.join(process.cwd(), "access.log"),
  { flags: "a" }
);

app.use(morgan("combined", { stream: logStream }));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.listen(3000, () =>
  console.log("🚀 Server çalışıyor: http://localhost:3000")
);
