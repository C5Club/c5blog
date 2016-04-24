/**
 * Created by maocg.
 * Date:2015/11/30.
 * Time:22:13.
 */
var models = require('../models/db');
var Topic = models.Topic;
var Reply = models.Reply;
exports.newAndSave = function (topic_id, user_id, nick, content, callback) {
    var reply = new Reply();
    reply.topic_id = topic_id;
    reply.user_id = user_id;
    reply.nick = nick;
    reply.content = content;
    reply.save(callback);
};
exports.delete = function (reply_id, callback) {
    // 删除状态改变
    Reply.findOne({_id: reply_id}, function (err, reply) {
        if (err || !reply) {
            return callback(err);
        }
        reply.deleted = true;
        reply.save(callback);
    });

};

exports.update = function (id, data, callback) {
    Reply.findByIdAndUpdate({_id: id}, {'$set': data}, callback);
};

exports.getCountByQuery = function (query, callback) {
    Reply.count(query, callback);
};

exports.getReplyByTopic = function (id, data, callback) {
    Reply.find({topic_id: id}, data, callback);
};
exports.getAllReply = function (callback) {
    Reply.find(callback);

}