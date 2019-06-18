"use strict"; // require block 
var fs = require("fs");
var parser = require("../csv/csvparser"); // Tim's module
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// Populate database from csv file 
Parse.Cloud.afterSave('File', async function (req) {
    // Once a csv file is uploaded, the data is retrieved, given a base, and transfered to json.
    var contents = await req.object.attributes.file.getData();
    var dataBuffer = new Buffer(contents, 'base64');
    var objects = parser.parsedToObjects((await parser.parseCSVBuffer(dataBuffer)));var _loop = async function _loop() {


        // spawn new parse object
        var newLibraryItem = new Parse.Object('Library');
        var item = objects[i];
        newLibraryItem.set('file', req.object);
        Object.keys(item).forEach(function (key) {
            newLibraryItem.set(key, item[key]);
        });
        try {
            await newLibraryItem.save({}, {
                useMasterKey: true });

            console.log(newLibraryItem);
        } catch (err) {
            console.log(err);
        }};for (var i = 0; i < objects.length; i++) {await _loop();

    }
});