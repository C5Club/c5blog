/**
 * Created by maocg.
 * Date:2015/11/30.
 * Time:22:12.
 */
var UserSet = require('../dao/userSetDao');
var config = require('../config');
var validator = require('validator');
var eventproxy = require('eventproxy');
var Busboy = require('busboy');
var fs = require('fs');
var path = require('path');
exports.showUserSet = function (req, res) {
    if (!req.session.user) {
        res.redirect('/');
    } else {
        res.render('userset',
            {user: req.session.user}
        )
    }
};

exports.userSet = function (req, res, next) {
    //1、验证字段
    //2、上传
    var photo = '';
    var busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        //这里是设置下载后目录的（我是这样理解的，实际也是这样，若有不对的欢迎指正）
        var saveTo = path.join(__dirname, '../public/uploads', path.basename(filename));
        photo = saveTo;
        file.pipe(fs.createWriteStream(saveTo));
    });
    busboy.on('finish', function () {
        var school = req.body.school;
        var user_id = req.body.user_id;
        var hobby = req.body.hobby;
        console.log('school= ' + school);
        UserSet.newAndSave(user_id, photo, hobby, school, function (err) {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        });
    });
    return req.pipe(busboy);
}

