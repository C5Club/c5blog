/**
 * user controller
 * Created by maocg.
 * Date:2015/11/21.
 * Time:20:21.
 */

var User = require('../models/db').User;
var config = require('../config');
var cache = require('../config/cache');
var _ = require('lodash');
var validator = require('validator');
var eventproxy = require('eventproxy');
var mail = require('../config/mail');
var tools = require('../config/tools');
var utility = require('utility');
var authMiddleWare = require('../middlewares/auth');
var uuid = require('node-uuid');
exports.index = function (req, res) {
    res.render('index', {
        title: '首页'
    });
}
exports.showSignup = function (req, res) {
    res.render('signup', {
        title: '用户注册',
        user: ''
    });
}
exports.signup = function (req, res, next) {
    var loginName = validator.trim(req.body.loginName);
    var nick = validator.trim(req.body.nick);
    var email = validator.trim(req.body.email);
    var password = validator.trim(req.body.password);
    var rePass = validator.trim(req.body.password - repeat);
    var ep = new eventproxy();
    ep.fail(next);
    ep.on('prop_err', function (msg) {
        res.status(422);
        res.render('signup', {error: msg, loginName: loginName, email: email});
    })
    // 验证数据的正确性
    if ([loginName, pass, rePass, email].some(function (item) {
        return item === '';
    })) {
        ep.emit('prop_err', '信息不完整。');
        return;
    }
    if (loginname.length < 3) {
        ep.emit('prop_err', '用户名至少需要3 个字符。');
        return;
    }
    if (!tools.validateId(loginName)) {
        return ep.emit('prop_err', '用户名不合法。');
    }
    if (!validator.isEmail(email)) {
        return ep.emit('prop_err', '邮箱不合法。');
    }
    if (pass !== rePass) {
        return ep.emit('prop_err', '两次密码输入不一致。');
    }
    // END 验证信息的正确性
    User.getUsersByQuery({'$or': [
        {'loginName': loginName},
        {'email': email}
    ]}, {}, function (err, users) {
        if (err) {
            return next(err);
        }
        if (users.length > 0) {
            ep.emit('prop_err', '用户名或邮箱已被使用。');
            return;
        }
        tools.bhash(pass, ep.done(function (passhash) {
            // create gravatar
            var avatarUrl = User.makeGravatar(email);
            User.newAndSave(loginname, loginname, passhash, email, avatarUrl, false, function (err) {
                if (err) {
                    return next(err);
                }
                // 发送激活邮件
                mail.sendActiveMail(email, utility.md5(email + passhash + config.session_secret), loginname);
                res.render('sign/signup', {
                    success: '欢迎加入 ' + config.name + '！我们已给您的注册邮箱发送了一封邮件，请点击里面的链接来激活您的帐号。'
                });
            });

        }));
    });

};

exports.showLogin = function (req, res, next) {
    res.render('signin', {
        title: '用户登录'
    });

};
exports.login = function (req, res, next) {

};
exports.activeAccount = function (req, res, next) {

};
exports.signout = function (req, res) {
    req.session.destroy();
    res.clearCookie(config.auth_cookie_name, { path: '/' });
    res.redirect('/');
};