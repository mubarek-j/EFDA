const express = require("express");
const path = require("path");
const mysql = require("mysql");
const dotenv = require("dotenv");
const cookie_parser = require("cookie-parser");

dotenv.config({ path: "./.env" });

const app = express();

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

const publicDir = path.join(__dirname, "./public");
app.use(express.static(publicDir));

app.use(cookie_parser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "hbs");
db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Mysql Connected!");
  }
});

app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));

app.listen(5000, () => {
  console.log("Server started on port 5000!");
});
