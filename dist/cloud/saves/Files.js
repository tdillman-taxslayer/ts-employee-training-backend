"use strict"; // require block 
var csv = require("csv-parser");
var fs = require("fs");
var json = [];

Parse.Cloud.afterSave('File', function (request) {
    var query = new Parse.Query('File');
    var file = request.object.attributes.file;

    console.log(file.url());

    Parse.Cloud.httpRequest({
        url: file.url() }).
    then(function (response) {
        console.log(response.buffer);

    });


});