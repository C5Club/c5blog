/**
 * Created by maocg.
 * Date:2015/11/30.
 * Time:22:12.
 */
var UserSet = require('../dao/userSetDao');
var config = require('../config');
var validator = require('validator');
var Busboy = require('busboy');
var fs = require('fs');
var path = require('path');
var inspect = require('util').inspect;

exports.showUserSet = function (req, res) {
    if (!req.session.user) {
        res.redirect('/');
    } else {
        res.render('userset',
            {
                title: '用户设置',
                user: req.session.user
            }
        )
    }
};

exports.userSet = function (req, res, next) {
    //1、验证字段
    //2、上传
    var photo = '';
    var school = '';
    var user_id = '';
    var hobby = '';
    var busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        var saveTo = path.join(__dirname, '../public/uploads', path.basename(filename));
        photo = saveTo;
        file.pipe(fs.createWriteStream(saveTo));
    });
    busboy.on('field', function (fieldname, val) {
        if (fieldname == 'school')
            school = validator.trim(inspect(val));
        if (fieldname == 'hobby')
            hobby = validator.trim(inspect(val));
        user_id = req.session.user._id.toString();
    });
    busboy.on('finish', function () {
        UserSet.newAndSave(user_id, photo, hobby, school, function (err) {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        });
    });
    return req.pipe(busboy);
}

