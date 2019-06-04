// require block 
var fs = require("fs");
var parser = require("../csv/csvparser"); // Tim's module
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// Populate database from csv file 
Parse.Cloud.afterSave('File', async req => {
    // Once a csv file is uploaded, the data is retrieved, given a base, and transfered to json.
    let contents = await req.object.attributes.file.getData();
    let dataBuffer = new Buffer(contents, 'base64');
    let objects = parser.parsedToObjects(await parser.parseCSVBuffer(dataBuffer));

    for (var i = 0; i < objects.length; i++) {
        // spawn new parse object
        let newLibraryItem = new Parse.Object('Library');
        let item = objects[i];
        newLibraryItem.set('file', req.object);
        Object.keys(item).forEach(key => {
            newLibraryItem.set(key, item[key]);
        });
        try {
            await newLibraryItem.save({}, {
                useMasterKey: true
            });
            console.log(newLibraryItem);
        } catch (err) {
            console.log(err);
        }

    }
})