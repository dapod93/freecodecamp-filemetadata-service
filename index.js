require("dotenv").config();

const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const fs = require("fs");
const multer = require("multer");
const path = require("path");

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static(process.cwd() + "/public"));

const uploadDir = path.join(__dirname, "uploads");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const uploader = multer({ storage: storage });

const checkUploadLimitMiddleware = (req, res, next) => {
  if (fs.readdirSync(uploadDir).filter((file) => fs.statSync(path.join(uploadDir, file)).isFile()).length >= 5) {
    return res.json({ error: "limit reached" });
  }
  next();
};

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", checkUploadLimitMiddleware, uploader.single("upfile"), (req, res) => {
  if (!req.file) {
    return res.json({ error: "no file uploaded" });
  }

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
