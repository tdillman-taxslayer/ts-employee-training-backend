// Tim's csvparser code

const CSV = require("csv");
/**
 *
 * @param {Buffer} buffer
 */
const parseCSVBuffer = async buffer => {
    let str = buffer.toString("utf8");
    return new Promise((resolve, reject) => {
        CSV.parse(
            str, {
                columns: true,
                skip_empty_lines: false
            },
            (err, output) => {
                if (err) {
                    return reject(err);
                }
                return resolve(output);
            }
        );
    });
};
/**
 *
 * @param {Object} parsed
 * @returns {Array<LibraryItem>}
 */
const parsedToObjects = parsed => {
    return parsed.map(i => {
        return new LibraryItem(i.type, i.cl, i.ka, i.title, i.url);
    });
};

class LibraryItem {
    constructor(type, cl, ka, title, url) {
        this.type = type;
        this.cl = cl;
        this.ka = ka;
        this.title = title;
        this.url = url;
    }
}

module.exports = {
    parseCSVBuffer,
    parsedToObjects
};