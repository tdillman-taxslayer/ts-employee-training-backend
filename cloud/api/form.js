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

  // To hold sessionToken
  const arr = [];

  const query = `${url}/login?username=${req.body.username}&password=${
    req.body.password
  }`;

  axios({
    url: query,
    method: "get",
    headers: {
      "X-Parse-Application-id": "your_app_id",
      "X-Parse-REST-API-Key": "client_key",
      "X-Parse-Revocable-Session": "1",
    },
  })
    .then(response => {
      // console.log(response);
      arr.push(response.data.sessionToken);
    })
    .then(() => console.log(arr))
    .then(() => res.send(arr[0]));
});

app.post("/session", (req, res) => {
  console.log(req.body);

  axios({
    url: `${url}/users/me`,
    method: "get",
    headers: {
      "X-Parse-Application-id": "your_app_id",
      "X-Parse-REST-API-Key": "client_key",
      "X-Parse-Session-Token": req.body.token,
    },
  }).then(response => {
    // console.log(response.data);
    if (response.data.objectId) {
      res.send({
        Id: response.data.objectId,
        auth: "true",
      });
    } else {
      res.send("Not authenticated");
    }
  });
});

app.listen(1300);
console.log("API listening on port 1300...");
