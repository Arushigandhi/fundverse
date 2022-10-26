require("dotenv").config({
  path: __dirname + "/.env",
});
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const myConnection = require("express-myconnection");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  myConnection(
    mysql,
    {
      host: "localhost",
      user: "root",
      password: "arushig02",
      database: "fundverse",
      insecureAuth: true,
    },
    "single"
  )
);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to our DBMS lab mini project." });
});
app.use("/api/campaign", require("./routes/campaign.route"));

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
