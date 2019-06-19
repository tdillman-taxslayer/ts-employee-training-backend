"use strict";var _express = require("express");var _express2 = _interopRequireDefault(_express);
var _bodyParser = require("body-parser");var _bodyParser2 = _interopRequireDefault(_bodyParser);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var app = (0, _express2.default)();

app.use(_express2.default.json());

// app.use(bodyParser.urlencoded({ extended: true }));

var url = "http://localhost:1337/parse";

app.use(function (req, res, next) {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.post("/data", function (req, res) {
  res.send("Received");
  console.log(req.body);

  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", url + "/users", true);
  xhttp.setRequestHeader("X-Parse-Application-id", "your_app_id");
  xhttp.setRequestHeader("X-Parse-REST-API-Key", "client_key");
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(req.body));
});

app.post("/login", function (req, res) {
  console.log(req.body);

  var xhttp = new XMLHttpRequest();
  xhttp.open(
  "GET",
  url + "/login?username=" + req.body.username + "&password=" + req.body.password,
  true);

  xhttp.setRequestHeader("X-Parse-Application-id", "your_app_id");
  xhttp.setRequestHeader("X-Parse-REST-API-Key", "client_key");
  xhttp.setRequestHeader("X-Parse-Revocable-Session", "1");
  // const query = `${url}/login?username=${req.body.username}&password=${
  //   req.body.password
  // }`;
  xhttp.send();
});

app.listen(1300);
console.log("API listening on port 1300...");