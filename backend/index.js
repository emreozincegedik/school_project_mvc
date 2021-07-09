const express = require("express");
const http = require("http");
const cors = require("cors");
const mysql = require("mysql");
const path = require("path");
var bodyParser = require("body-parser");

const routes = require("./routes");
const app = express();
app.use(cors())




const port = 5000;
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use("/", routes);
app.use(express.static(path.join(__dirname, "build")));
app.get("/*", function (req, res) {
  console.log("main page")
  res.sendFile(path.join(__dirname, "build", "index.html"));
});


app.listen(port, () => {
      console.log("Server listening on port " + port);
    });
