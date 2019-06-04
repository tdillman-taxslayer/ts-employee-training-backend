"use strict";function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}} // Tim's csvparser code

var CSV = require("csv");
/**
                           *
                           * @param {Buffer} buffer
                           */
var parseCSVBuffer = async function parseCSVBuffer(buffer) {
    var str = buffer.toString("utf8");
    return new Promise(function (resolve, reject) {
        CSV.parse(
        str, {
            columns: true,
            skip_empty_lines: false },

        function (err, output) {
            if (err) {
                return reject(err);
            }
            return resolve(output);
        });

    });
};
/**
    *
    * @param {Object} parsed
    * @returns {Array<LibraryItem>}
    */
var parsedToObjects = function parsedToObjects(parsed) {
    return parsed.map(function (i) {
        return new LibraryItem(i.type, i.cl, i.ka, i.title, i.url);
    });
};var

LibraryItem =
function LibraryItem(type, cl, ka, title, url) {_classCallCheck(this, LibraryItem);
    this.type = type;
    this.cl = cl;
    this.ka = ka;
    this.title = title;
    this.url = url;
};


module.exports = {
    parseCSVBuffer: parseCSVBuffer,
    parsedToObjects: parsedToObjects };