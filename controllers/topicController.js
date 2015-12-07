/**
 * user controller
 * Created by maocg.
 * Date:2015/11/21.
 * Time:20:21.
 */

var Topic = require('../dao/topicDao');
var config = require('../config');
var validator = require('validator');
var eventproxy = require('eventproxy');
var tools = require('../config/tools');
exports.showCreate = function (req, res) {
        res.render('topic', {
            title: '发表微博',
            user: req.session.user
        });
}

exports.create = function (req, res, next) {
    var user_id = req.body.user_id;
    var title = req.body.title;
    var content = req.body.content;
    console.log(user_id+'-----');
    Topic.newAndSave(user_id,title,content,function (err){
        if (err) {
            return next(err);
        }else{
            res.redirect('/');
        }
    });
};
