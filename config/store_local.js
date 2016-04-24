// 文件上传到本地
var config = require('../config');
var utility = require('utility');
var path = require('path');
var fs = require('fs');
var Busboy = require('busboy');
exports.upload = function (req, res) {
    var busboy = new Busboy({ headers: req.headers });
    var url = busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        var newFilename = utility.md5(filename + String((new Date()).getTime())) +
            path.extname(filename);
        var url = path.join(__dirname, '../public/uploads', path.basename(newFilename)).toString;
        file.pipe(fs.createWriteStream(url));
        return url;
    });
    busboy.on('finish', function () {
        res.writeHead(200);
        console.log('upload success!')
    });
    return url;
};
