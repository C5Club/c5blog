/**
 * Created by maocg.
 * Date:2015/11/30.
 * Time:22:13.
 */
var models = require('../models/db');
var Topic = models.Topic;

exports.newAndSave = function (user_id, title, content, callback) {
    var topic = new Topic();
    topic.user_id = user_id;
    topic.title = title;
    topic.content = content;
    topic.save(callback);
};
exports.delete = function (topic_id, callback) {
    // 删除状态改变
    Topic.findOne({_id: topic_id}, function (err, topic) {
        if (err || !topic) {
            return callback(err);
        }
        topic.deleted = true;
        topic.save(callback);
    });


};
exports.update = function (id, data, callback) {
    Topic.findByIdAndUpdate({_id: id}, {'$set': data}, callback);
};
exports.getCountByQuery = function (query, callback) {
    Topic.count(query, callback);
};
exports.getReplyByTopic = function (id, data, callback) {
    Topic.findOne({topic_id: id}, data, callback);
};
exports.getAllTopic = function (callback) {
    Topic.find({deleted: false}, callback);

}