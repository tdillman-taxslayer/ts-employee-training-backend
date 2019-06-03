// require block 
var fs = require("fs");
var parser = require("../csv/csvparser"); // Tim's module
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// Populate database from csv file 
Parse.Cloud.afterSave('File', async req => {
    let contents = await req.object.attributes.file.getData();
    let dataBuffer = new Buffer(contents, 'base64');
    let objects = parser.parsedToObjects(await parser.parseCSVBuffer(dataBuffer));
    console.log(objects);
    for (var i = 0; i < objects.length; i++) {
        // spawn new parse object
        let newLibraryItem = new Parse.Object('Library2');
        let item = objects[i];
        Object.keys(item).forEach(key => {
            newLibraryItem.set(key, items[key]);
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
    // STill not hitting it
    // query.equalTo("file", req.object);
    // let u = await query.first({
    //     useMasterKey: true
    // });



    // I just did, should I start parse on browser to upload a file?













    // const parseFile = new Parse.File(name, file); // that's what sdk documentation say

    // Putting csv to json object. 
    // let file = fs.readFileSync('../csv/sample.csv'); // request object attribute
    // let parsed = await parser.parseCSVBuffer(file);
    // let jsoncsv = parser.parsedToObjects(parsed);

    // var arr = [];

    // json object to Parse library 
    // if (!u) {
    //     var library = new Parse.Object('Library2');

    //     jsoncsv.forEach((x) => {
    //         let row = {
    //             title: x.title,
    //             url: x.url,
    //             KAT: x.ka,
    //             competency: x.cl,
    //             type: x.type,
    //             file: {
    //                 __type: "Pointer",
    //                 className: "File",
    //                 objectId: req.object.id
    //             }
    //         }
    //         arr.push(row);
    //     })

    //     console.log(arr);

    //     for (let i = 0; i < arr.length; i++) {
    //         const element = arr[i];

    //         const xhttp = new XMLHttpRequest();
    //         xhttp.open("POST", "http://localhost:1337/parse/classes/Library2", true);
    //         xhttp.setRequestHeader("X-Parse-Application-id", "your_app_id");
    //         xhttp.setRequestHeader("X-Parse-REST-API-Key", "client_key");
    //         xhttp.setRequestHeader("Content-Type", "application/json");
    //         xhttp.send(JSON.stringify(element));
    //     }
    // }
})