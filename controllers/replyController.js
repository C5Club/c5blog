/**
 * user controller
 * Created by maocg.
 * Date:2015/11/21.
 * Time:20:21.
 */
var models = require('../models/db');
var UserNotify = models.UserNotify;
var Topic = require('../dao/topicDao');
var Reply = require('../dao/replyDao');
var config = require('../config');
var Log = require('../config/logger');

exports.showCreate = function(req, res) {
    var id = req.param('tid');
    Topic.getTopicById(id, function(err, topic) {
        if (err) {
            return next(err);
        } else {
            if (topic) {
                res.render('reply/create', {
                    title: '发表评论',
                    user: req.session.user,
                    topic: topic
                });
            } else {
                res.redirect('/');
            }
        }
    });
}
exports.showReply = function(req, res, next) {
    var id = req.param('topic_id');
    Topic.getTopicById(id, function(err, topic) {
        if (err) {
            return next(err);
        }
        if (topic) {
            res.render('topic/edit', {
                title: '修改微博',
                user: req.session.user,
                topic: topic
            });
        } else {
            res.redirect('/');
        }
    });
};

//有人评论了user的文章,产生一个消息,提醒user有人评论了他的文章
exports.create = function(req, res, next) {
    var topic_id = req.param('tid');
    var user_id = req.body.user_id;
    var content = req.body.content;
    var nick = req.body.nick;
    Reply.newAndSave(topic_id, user_id, nick, content, function(err) {
        if (err)
            return next(err);
        //产生一条消息
        Topic.getTopicById(topic_id, function(err, topic) {
            if (err)
                return next(err);
            console.log(topic + '===========');
            var userNotify = new UserNotify();
            userNotify.receiver = topic.user_id;
            userNotify.sender = user_id;
            userNotify.save(function(err) {
                if (err)
                    return next(err);
                res.redirect('/topic/' + topic_id);

            });
        });

    });
};


exports.showEdit = function(req, res, next) {
    var id = req.param('tid');
    Topic.getTopicById(id, function(err, topic) {
        if (err) {
            Log.app.error(err);
            next(err);
        } else {
            if (topic) {
                res.render('reply/edit', {
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
exports.edit = function(req, res, next) {
    var id = req.param('rid');
    var content = req.body.content;
    var data = {
        content: content
    };
    Reply.update(id, data, function(err) {
        if (err) {
            return next(err);
        } else {
            res.redirect('/');
        }
    });
};

exports.delete = function(req, res, next) {
    var id = req.param('rid');
    Reply.delete(id, function(err, callback) {
        if (err) {
            Log.app.error(err);
            next(err);
        } else {
            req.flash('success', '删除成功');
            res.redirect('/');
        }
    });

};