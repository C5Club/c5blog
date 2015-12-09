/**
 * Created by maocg.
 * Date:2015/11/20.
 * Time:9:39.
 */
/*var bcrypt = require('bcryptjs');
bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash('B4c0/\/', salt, function (err, hash) {
        // Store hash in your password DB.
        console.log(salt);
    });
});*/
//email test
//var mail = require('../config/mail');
//mail.sendActiveMail('13240105904@163.com','aaa','test');
//redis test
//var Topic = require('../models/db').Topic;
var config = require('../config');
var Topic = require('../dao/topicDao')
// mongo test
//User.newAndSave('aaaaa', 'test', '123456', 'aaa@aa.com', false, function (err) {
//    if (err) {
//        return next(err);
//    }
//    console.log('save user ok!');
//});
//var user=User.findOne({'loginName': 'test'});
/*Topic.find( function (err, docs) {
    if (err)
        console.log(err);
    console.log(docs.length+'========');
});*/

Topic.getAllTopic(function(err,topics){
    if (err)
        console.log(err);
    console.log(topics.length+'========');
});