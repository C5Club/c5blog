/**
 * Created by maocg.
 * Date:2015/11/22.
 * Time:15:00.
 */
var models = require('../models/db');
var User = models.User;

/**
 * 根据用户名列表查找用户列表
 * Callback:
 * - err, 数据库异常
 * - users, 用户列表
 * @param {Array} names 用户名列表
 * @param {Function} callback 回调函数
 */
exports.getUsersByNames = function(names, callback) {
    if (names.length === 0) {
        return callback(null, []);
    }
    User.find({
        loginname: {
            $in: names
        }
    }, callback);
};

/**
 * 根据登录名查找用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} loginName 登录名
 * @param {Function} callback 回调函数
 */
exports.getUserByLoginName = function(loginName, callback) {
    User.findOne({
        'loginName': loginName
    }, callback);
};

/**
 * 根据用户ID，查找用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} id 用户ID
 * @param {Function} callback 回调函数
 */
exports.getUserById = function(id, callback) {
    if (!id) {
        return callback();
    }
    User.findOne({
        _id: id
    }, callback);
};

/**
 * 根据邮箱，查找用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} email 邮箱地址
 * @param {Function} callback 回调函数
 */
exports.getUserByMail = function(email, callback) {
    User.findOne({
        email: email
    }, callback);
};

/**
 * 根据用户ID列表，获取一组用户
 * Callback:
 * - err, 数据库异常
 * - users, 用户列表
 * @param {Array} ids 用户ID列表
 * @param {Function} callback 回调函数
 */
exports.getUsersByIds = function(ids, callback) {
    User.find({
        '_id': {
            '$in': ids
        }
    }, callback);
};

/**
 * 获取所有用户信息
 * @param callback
 */
exports.getAllUsers = function(callback) {
    User.find({}, callback);
};
/**
 * 根据关键字，获取一组用户
 * Callback:
 * - err, 数据库异常
 * - users, 用户列表
 * @param {String} query 关键字
 * @param {Object} opt 选项
 * @param {Function} callback 回调函数
 */
exports.getUsersByQuery = function(query, opt, callback) {
    User.find(query, '', opt, callback);
};

/**
 * 根据查询条件，获取一个用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} name 用户名
 * @param {String} key 激活码
 * @param {Function} callback 回调函数
 */
exports.getUserByNameAndKey = function(loginname, key, callback) {
    User.findOne({
        loginname: loginname,
        retrieve_key: key
    }, callback);
};

exports.newAndSave = function(nick, loginName, password, email, callback) {
    var user = new User();
    user.loginName = loginName;
    user.password = password;
    user.nick = nick;
    user.email = email;
    user.save(callback);
};