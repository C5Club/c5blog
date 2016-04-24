/**
 * Module dependencies.
 */

var express = require('express');

var config = require('../config');
var user = require('../controllers/userController');
var userSet = require('../controllers/userSetController');
var topic = require('../controllers/topicController');
var reply = require('../controllers/replyController');
var message = require('../controllers/messageController');

var router = express.Router();


// home page
router.get('/', user.index);

router.get('/signup', user.showSignup);  // 跳转到注册页面
router.post('/signup', user.signup);  // 提交注册信息
router.get('/signin', user.checkLogin, user.showLogin);  // 进入登录页面
router.post('/signin', user.login);  // 登录校验
router.get('/userset', user.checkLogin, userSet.showUserSet); //用户设置
router.post('/userset', userSet.userSet); //用户设置

router.get('/signout', user.signout);  // 登出
router.get('/searchmsg/:userId',message.searchMsg)
router.get('/readmsg/:msgId',message.readMsg);

// topic
router.get('/topic/create', user.checkLogin, topic.showCreate);
router.post('/topic/create', user.checkLogin, topic.create);
router.get('/topic/:tid', user.checkLogin, topic.showTopic);

router.get('/topic/:tid/edit', user.checkLogin, topic.showEdit);
router.post('/topic/:tid/edit', user.checkLogin, topic.edit);
router.get('/topic/:tid/delete', user.checkLogin, topic.delete);
// reply
router.get('/topic/:tid/reply', user.checkLogin, reply.showCreate);
router.post('/topic/:tid/reply', user.checkLogin, reply.create);
router.get('/reply/:rid/reply', user.checkLogin, reply.showEdit);
router.post('/reply/:rid/reply', user.checkLogin, reply.edit);




module.exports = router;
