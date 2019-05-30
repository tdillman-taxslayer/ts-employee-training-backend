'use strict';var request = require('request-promise');
var Parse = require('parse/node');

console.log(Parse);


var options = {
    uri: '', // hard and relative paths don't work
    resolveWithFullResponse: true,
    encoding: null


    // https://docs.parseplatform.org/js/guide/#server-side
};request(options).then(function (response) {
    var data = Array.from(Buffer.from(response.body, 'binary'));
    var contentType = response.headers['content-type'];
    var file = new Parse.File('data', data);
    return file.save();

}).then(function (file) {
    console.log(file.uri());

}).catch(console.error);
'';