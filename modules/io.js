module.exports = {
    readFile: (filePath) => {
        return new Promise((resolve, reject) => {
            var fs = require("fs");
            fs.readFile(filePath, (err, buf) => {
                if (err) throw err;
                resolve(buf.toString())
            });
        })
    }
};