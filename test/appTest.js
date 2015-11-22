/**
 * Created by maocg.
 * Date:2015/11/20.
 * Time:9:39.
 */
var bcrypt = require('bcryptjs');
bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash('B4c0/\/', salt, function(err, hash) {
        // Store hash in your password DB.
        console.log(salt);
    });
});
//email test
var mail = require('../config/mail');
//mail.sendActiveMail('13240105904@163.com','aaa','test');
//redis test
var User= require('../models/db').User;
var UserDao = require('../dao/userDao');
var config = require('../config');
var cache = require('../config/cache');
// mongo test
//User.newAndSave('aaaaa', 'test', '123456', 'aaa@aa.com', false, function (err) {
//    if (err) {
//        return next(err);
//    }
//    console.log('save user ok!');
//});
var user=User.findOne({'loginName': 'test'});
console.log(user)