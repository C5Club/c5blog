/**
 * user controller
 * Created by maocg.
 * Date:2015/11/21.
 * Time:20:21.
 */

var Topic = require('../dao/topicDao');
var Reply = require('../dao/replyDao');
var config = require('../config');
var Log = require('../config/logger');
var validator = require('validator');
var eventproxy = require('eventproxy');
var tools = require('../config/tools');
exports.showCreate = function (req, res) {
    res.render('reply/create', {
        title: '发表评论',
        user: req.session.user
    });
}
exports.showReply = function (req, res, next) {
    var id = req.param('topic_id');
    Topic.getTopicById(id, function (err, topic) {
        if (err) {
            Log.log(err);
            next(err);
        } else {
            if (topic) {
                console.log('=========+' + topic);
                res.render('topic/edit', {
                    title: '修改微博',
                    user: req.session.user,
                    topic: topic
                });
            } else {
                res.redirect('/');
            }
        }
    });
};

exports.create = function (req, res, next) {
    var user_id = req.body.user_id;
    var topic_id = req.body.topic_id;
    var content = req.body.content;
    Reply.newAndSave(topic_id, user_id, content, function (err) {
        if (err) {
            Log.error(err);
            return next(err);
        } else {
            res.redirect('/');
        }
    });
};


exports.delete = function (req, res, next) {
    var id = req.param('rid');
    Reply.delete(id, function (err, callback) {
        if (err) {
            Log.error(err);
            next(err);
        } else {
            req.flash('success', '删除成功');
            res.redirect('/');
        }
    });

}