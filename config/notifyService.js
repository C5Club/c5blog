/**
 * Created by maocg.
 * Date:2016/2/23 0023.
 * Time:上午 11:09.
 */
var Log = require('../config/logger');
var config = require('../config');
var models = require('../models/db'),
    Topic = models.Topic,
    Reply = models.Reply,
    Notify = models.Notify,
    UserNotify = models.UserNotify,
    SubScription = models.SubScription,
    SubScriptionConfig = models.SubScriptionConfig;


exports.createAnnounce = function (topicId, content, sender) {
    var notify = new Notify();
    notify.content = content;
    notify.type = 1;
    notify.target = topicId;
    notify.targetType = 'post';
    notify.sender = sender;
    notify.save(notify, function (err) {
        if (err)
            Log.log(err);
        else
            Log.log(notify);
    });

}
/**
 * 创建提醒
 * @param topicId
 * @param targetType
 * @param action
 * @param sender
 * @param content
 */
exports.createRemind = function (topicId, targetType, action, sender, content) {
    var notify = new Notify();
    notify.content = content;
    notify.type = 2;
    notify.target = topicId;
    notify.targetType = targetType;
    notify.sender = sender;
    notify.action = action;
    notify.save(notify, function (err) {
        if (err)
            Log.log(err);
        else
            Log.log(notify);
    });
}
/**
 *
 * @param content
 * @param sender
 * @param receiver
 */
exports.createMessage = function (content, sender, receiver) {
    var notify = new Notify();
    notify._id = new ObjectId();
    notify.content = content;
    notify.type = 3;
    notify.target = receiver;
    notify.sender = sender;
    notify.save(notify, function (err) {
        var userNotify = new UserNotify();
        userNotify.user = receiver;
        userNotify.notify = notify._id;
        if (err)
            Log.log(err);
        else
            Log.log(notify);
    });


}
/**
 *
 * @param userId
 */
exports.pullAnnounce = function (userId) {
    //    从UserNotify中获取最近的一条公告信息的创建时间: lastTime
    UserNotify.findOne({user: userId, type: 1}, function (err, usernotify) {
        if (usernotify) {
            //    用lastTime作为过滤条件，查询Notify的公告信息
            //    新建UserNotify并关联查询出来的公告信息
            Notify.find({create_at: usernotify.create_at}, function (err, notifys) {
                if (notifys) {
                    for (var i = 0; i < notifys.length; i++) {
                        var notify = notifys[i];
                        var data = new UserNotify();
                        data.user = userId;
                        data.notify = notify._id;
                        UserNotify.save(data);
                    }
                }
            })
        }
    });
}
/**
 * 拉取提醒
 * @param userId
 */
exports.pullRemind = function (userId, callback) {
//    查询用户的订阅表，得到用户的一系列订阅记录
    SubScription.find({user: userId}, function (err, subScriptions) {
        //    通过每一条的订阅记录的target、targetType、action、createdAt去查询Notify表，获取订阅的Notify记录。（注意订阅时间必须早于提醒创建时间）
        //    查询用户的配置文件SubscriptionConfig，如果没有则使用默认的配置DefaultSubscriptionConfig
        //    使用订阅配置，过滤查询出来的Notify
        //    使用过滤好的Notify作为关联新建UserNotify
        if (subScriptions) {
            for (var i = 0; i < subScriptions.size; i++) {
                var sub = subScriptions[i];
                Notify.findOne({type: 2, target: sub.target, targetType: sub.targetType, action: sub.action, create_at: {$gt: sub.create_at}}, function (err, notify) {
                    UserNotify.save({user: userId, notify: notify._id}, callback);
                });
            }
        }
    });

}
/**
 * 订阅事件
 * @param user
 * @param target
 * @param targetType
 * @param reason
 */
exports.subscription = function (user, target, targetType, reason, callback) {
//    通过reason，查询NotifyConfig，获取对应的动作组:actions
    var action = config.action;
//    遍历动作组，每一个动作新建一则Subscription记录

    SubScription.save({user: user, target: target, targetType: targetType, action: action}, callback);

}
/**
 * 取消订阅
 * @param user
 * @param target
 * @param targetType
 */
exports.cancelSubscription = function (user, target, targetType, callback) {
    //  删除user、target、targetType对应的一则或多则记录
    SubScription.remove({user: user, target: target, targetType: targetType}, callback);
}
/**
 * 获取用户订阅配置
 * @param userId
 */
exports.getSubscriptionConfig = function (userId, callback) {
//    查询SubscriptionConfig表，获取用户的订阅配置
    SubScriptionConfig.find({user: userId}, function (err, configs) {
        if (err)
            callback(err);
        if (configs)
            callback(configs);
    });
}
/**
 *  更新订阅的配置
 * @param userId
 */
exports.updateSubscriptionConfig = function (userId, data, callback) {
//    更新用户的SubscriptionConfig记录
    SubScriptionConfig.findOneAndUpdate({user: userId}, {'$set': data}, callback);

}
/**
 *  获取用户订阅的消息
 * @param userId
 */
exports.getUserNotify = function (userId, callback) {
//    获取用户的消息列表
    UserNotify.find({user: userId}, function (err, userNotifys) {
        if (err)
            callback(err);
        if (userNotifys)
            callback(userNotifys);
    });
}
/**
 * 阅读消息
 * @param userId
 * @param notifyIds
 */
exports.read = function (userId, notifyIds) {
//    更新指定的notify，把isRead属性设置为true
    UserNotify.find({user: userId}, function (err, userNotifys) {
        if (userNotifys) {
            for (var i = 0; i < userNotifys.size; i++) {
                for (var j = 0; j < notifyIds.size; j++) {
                    if (userNotifys[i] === notifyIds[j]) {
                        userNotifys[i].isRead = true;
                    }
                }
            }
        }
    });
}