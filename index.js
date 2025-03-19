require("dotenv").config();

const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const multer = require("multer");
const path = require('path');

var app = express();


const uploadDir  = path.join(__dirname, "uploads")
const uploader = multer({storage: });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload, async (req, res) => {});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
