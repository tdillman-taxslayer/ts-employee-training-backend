"use strict";var _http = require("http");
var _util = require("util");

Parse.Cloud.afterSave("Capability", function (request) {
    var capability = request.object;

    console.log(capability["name"]);
    console.log(capability);

    var query = new Parse.Query("Employee");

    query.get(capability.get("name")).then(function (p) {
        Parse.Classes['Employees'].set("name", capability["name"]);
        Parse.Classes['Employees'].save();
    }).catch(function (error) {console.error('Error occurred');
    });

    console.log(Parse.Classes);



});