/**
 * Created by maocg.
 * Date:2015/11/30.
 * Time:22:12.
 */
var UserSet = require('../dao/userSetDao');
var config = require('../config');
var validator = require('validator');
var eventproxy = require('eventproxy');
var upload = require('../config/store_local');
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
    var school = validator.trim(req.body.school);
    var user_id = validator.trim(req.body.user_id);
    var hobby = validator.trim(req.body.hobby);
    //2、上传
    var photo = upload.upload(req.photo);
    console.log(photo)
    //3、保存到db
    UserSet.newAndSave(user_id, photo, hobby, school, function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
}

