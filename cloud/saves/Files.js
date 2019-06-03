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
        newLibraryItem.set('file', {
            __type: "Pointer",
            className: "File",
            objectId: req.object.id
        });
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

/*
    var query = new Parse.Query('Library');

    query.equalTo("file", req.object);
    let u = await query.first({
        useMasterKey: true
    });

    // Putting csv to json object. 
    /*  // let file = fs.readFileSync('../csv/sample.csv'); // request object attribute
      let file = fs.readFileSync(dataBuffer);
      let parsed = await parser.parseCSVBuffer(file);
      let jsoncsv = parser.parsedToObjects(parsed);
      console.log(jsoncsv); ***

    var arr = [];

    // json object to Parse library 
    if (!u) {
        var library = new Parse.Object('Library2');

        // Objects replacing jsoncsv 
        objects.forEach((x) => {
            let row = {
                title: x.title,
                url: x.url,
                KAT: x.ka,
                competency: x.cl,
                type: x.type,
                file: {
                    __type: "Pointer",
                    className: "File",
                    objectId: req.object.id
                }
            }
            arr.push(row);
        })

        console.log(arr);

        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];

            const xhttp = new XMLHttpRequest();
            xhttp.open("POST", "http://localhost:1337/parse/classes/Library2", true);
            xhttp.setRequestHeader("X-Parse-Application-id", "your_app_id");
            xhttp.setRequestHeader("X-Parse-REST-API-Key", "client_key");
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.send(JSON.stringify(element));
        }
    }
    */