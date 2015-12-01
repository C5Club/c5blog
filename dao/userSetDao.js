/**
 * Created by maocg.
 * Date:2015/11/30.
 * Time:22:13.
 */
var models = require('../models/db');
var UserSet = models.UserSet;

exports.newAndSave = function (user_id, photo, hobby, school, callback) {
    var userSet = new UserSet();
    userSet.user_id = user_id;
    userSet.photo = photo;
    userSet.hobby = hobby;
    userSet.school = school;
    userSet.save(callback);
};
