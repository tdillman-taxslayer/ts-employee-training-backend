const request = require('request-promise');
const Parse = require('parse/node');

console.log(Parse);


const options = {
    uri: '', // hard and relative paths don't work
    resolveWithFullResponse: true,
    encoding: null
}

// https://docs.parseplatform.org/js/guide/#server-side
request(options).then((response) => {
    const data = Array.from(Buffer.from(response.body, 'binary'));
    const contentType = response.headers['content-type'];
    const file = new Parse.File('data', data);
    return file.save();

}).then(((file) => {
    console.log(file.uri())

})).catch(console.error);
``