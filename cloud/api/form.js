import express from "express";
import bodyParser from "body-parser";
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fetch = require("node-fetch");
import axios from "axios";

const app = express();

app.use(express.json());

// app.use(bodyParser.urlencoded({ extended: true }));

const url = "http://localhost:1337/parse";

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
  xhttp.open("POST", `${url}/users`, true);
  xhttp.setRequestHeader("X-Parse-Application-id", "your_app_id");
  xhttp.setRequestHeader("X-Parse-REST-API-Key", "client_key");
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(req.body));
});

app.post("/login", (req, res) => {
  console.log(req.body);

  /*
  const xhttp = new XMLHttpRequest();
  xhttp.open(
    "GET",
    `${url}/login?username=${req.body.username}&password=${req.body.password}`,
    true
  );
  xhttp.setRequestHeader("X-Parse-Application-id", "your_app_id");
  xhttp.setRequestHeader("X-Parse-REST-API-Key", "client_key");
  xhttp.setRequestHeader("X-Parse-Revocable-Session", "1");
  xhttp.responseType = "json";
  console.log(xhttp.responseText);
  xhttp.send();
*/

  const query = `${url}/login?username=${req.body.username}&password=${
    req.body.password
  }`;
  /*
  fetch(query, {
    method: "GET",
    headers: {
      "X-Parse-Application-id": "your_app_id",
      "X-Parse-REST-API-Key": "client_key",
      "X-Parse-Revocable-Session": "1"
    }
  }).then(res => console.log(res)); */

  axios({
    url: query,
    method: "get",
    headers: {
      "X-Parse-Application-id": "your_app_id",
      "X-Parse-REST-API-Key": "client_key",
      "X-Parse-Revocable-Session": "1"
    }
  }).then(response => console.log(response.data.sessionToken));
});

app.listen(1300);
console.log("API listening on port 1300...");
