/**
 * user controller
 * Created by maocg.
 * Date:2015/11/21.
 * Time:20:21.
 */

var Topic = require('../dao/topicDao');
var Reply = require('../dao/replyDao');
var User = require('../dao/userDao');
var config = require('../config');
var Log = require('../config/logger');
var validator = require('validator');
var eventproxy = require('eventproxy');
var tools = require('../config/tools');
exports.showCreate = function (req, res) {
    res.render('topic/create', {
        title: '发表微博',
        user: req.session.user
    });
}
exports.showEdit = function (req, res, next) {
    var id = req.param('tid');
    Topic.getTopicById(id, function (err, topic) {
        if (err) {
            Log.log(err);
            next(err);
        } else {
            if (topic) {
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
exports.showTopic = function (req, res, next) {
    var id = req.param('tid');
    Topic.getTopicById(id, function (err, topic) {
        if (err) {
            Log.log(err);
            next(err);
        }
        if (!topic) {
            res.redirect('/');
        }
        User.getAllUsers(function (err, users) {
            if (err)
                return next(err);
            if (users) {
                Reply.getReplyByTopic(id, function (err, replys) {
                    if (err) {
                        next(err);
                        return;
                    }
                    res.render('topic/topic', {
                        title: '修改微博',
                        user: req.session.user,
                        topic: topic,
                        replys: replys || null,
                        users: users
                    });
                })
            } else
                res.redirect('/');
        });

    });
};

exports.create = function (req, res, next) {
    var user_id = req.body.user_id;
    var title = req.body.title;
    var content = req.body.content;
    Topic.newAndSave(user_id, title, content, function (err) {
        if (err) {
            Log.error(err);
            return next(err);
        } else {
            res.redirect('/');
        }
    });
};
exports.edit = function (req, res, next) {
    var id = req.param('tid');
    var title = req.body.title;
    var content = req.body.content;
    var data = {
        title: title,
        content: content
    };
    Topic.update(id, data, function (err) {
        if (err) {
            return next(err);
        } else {
            res.redirect('/');
        }
    });
};

exports.delete = function (req, res, next) {
    var id = req.param('tid');
    Topic.delete(id, function (err, callback) {
        if (err) {
            Log.error(err);
            next(err);
        } else {
            req.flash('success', '删除成功');
            res.redirect('/');
        }
    });

}
function getUserNanme(users, replys) {
    for (var i = 0; i < users.length; i++) {
        for (var j = 0; j < replys.length; j++) {
            if (users[i]._id == replys[j].user_id) {
                delete replys[j].user_id;
                replys[j].user_id = users[i].nick;
            }
        }
    }
}