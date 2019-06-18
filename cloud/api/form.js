import express from "express";
import bodyParser from "body-parser";
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const app = express();

app.use(express.json());

// app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.post("/data", (req, res) => {
  res.send("Received");
  console.log(req.body);

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:1337/parse/users", true);
  xhttp.setRequestHeader("X-Parse-Application-id", "your_app_id");
  xhttp.setRequestHeader("X-Parse-REST-API-Key", "client_key");
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(req.body));
});

app.listen(1300);
console.log("API listening on port 1300...");
