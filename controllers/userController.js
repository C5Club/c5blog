/**
 * user controller
 * Created by maocg.
 * Date:2015/11/21.
 * Time:20:21.
 */

var User = require('../dao/userDao');
var Topic = require('../dao/topicDao');
var config = require('../config');
var validator = require('validator');
var eventproxy = require('eventproxy');
var tools = require('../config/tools');
exports.index = function (req, res) {
    Topic.getAllTopic(function (err, topics) {
        if (err) {
            console.log(err);
            return;
        }
        res.render('index', {
            title: '首页',
            user: req.session.user,
            topics: topics
        });
    });

}
exports.showSignup = function (req, res) {

    res.render('signup', {
        title: '用户注册',
        user: req.session.user
    });
}
/**
 * 注册
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.signup = function (req, res, next) {
    var loginName = validator.trim(req.body.loginName);
    var nick = validator.trim(req.body.nick);
    var email = validator.trim(req.body.email);
    var password = validator.trim(req.body.password);
    var rePass = validator.trim(req.body.repass);
    var ep = new eventproxy();
    ep.fail(next);
    ep.on('prop_err', function (msg) {
        res.status(422);
        res.render('signup', {error: msg, loginName: loginName, email: email});
    })
    // 验证数据的正确性
    if ([loginName, password, rePass, email].some(function (item) {
        return item === '';
    })) {
        ep.emit('prop_err', '信息不完整。');
        return;
    }
    if (loginName.length < 3) {
        ep.emit('prop_err', '用户名至少需要3 个字符。');
        return;
    }
    if (!tools.validateId(loginName)) {
        return ep.emit('prop_err', '用户名不合法。');
    }
    if (!validator.isEmail(email)) {
        return ep.emit('prop_err', '邮箱不合法。');
    }
    if (password !== rePass) {
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
        User.newAndSave(nick, loginName, password, email, function (err) {
            if (err) {
                return next(err);
            }
            var user = {
                nick: nick,
                loginName: loginName,
                password: password,
                email: email
            }
            req.session.user = user;
            res.render('index', {
                success: req.flash('欢迎！').toString(),
                user: req.session.user
            });
        });
    });
};

exports.showLogin = function (req, res, next) {
    res.render('signin', {
        title: '登陆',
        user: req.session.user | null
    });
};
/**
 * 登录
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.login = function (req, res, next) {
    var loginName = validator.trim(req.body.loginName);
    var pass = validator.trim(req.body.password);
    var ep = new eventproxy();

    ep.fail(next);

    if (!loginName || !pass) {
        res.status(422);
        return res.render('index', { error: '信息不完整。' });
    }

    var getUser = User.getUserByLoginName;

    ep.on('login_error', function (login_error) {
        res.status(403);
        res.render('index', { error: '用户名或密码错误' });
    });

    getUser(loginName, function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return ep.emit('login_error');
        }
        var passhash = user.password;
        if (pass != passhash) {
            return ep.emit('login_error');
        }
        req.session.user = user;
        console.log(req.session);
        req.flash('success', '登入成功');
        res.render('index', {
                user: req.session.user
            }
        );
    });
};

exports.signout = function (req, res) {
    req.session.destroy();
    res.clearCookie(config.auth_cookie_name, { path: '/' });
    res.redirect('/');
};
exports.checkLogin = function (req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.render('signin', {
            title: '首页',
            user: req.session.user | null
        });

    }
}