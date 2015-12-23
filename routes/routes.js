/**
 * Module dependencies.
 */

var express = require('express');

var config = require('../config');
var user = require('../controllers/userController');
var userSet = require('../controllers/userSetController');
var topic = require('../controllers/topicController');
var reply = require('../controllers/replyController');

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
//router.get('/search_pass', sign.showSearchPass);  // 找回密码页面
//router.post('/search_pass', sign.updateSearchPass);  // 更新密码
//router.get('/reset_pass', sign.resetPass);  // 进入重置密码页面
//router.post('/reset_pass', sign.updatePass);  // 更新密码

// topic
router.get('/topic/create', user.checkLogin, topic.showCreate);
router.post('/topic/create', user.checkLogin, topic.create);
router.get('/topic/:tid/edit', user.checkLogin, topic.showEdit);
router.post('/topic/:tid/edit', user.checkLogin, topic.edit);

router.get('/topic/:tid', user.checkLogin, topic.showTopic);
router.get('/topic/:tid/delete', user.checkLogin, topic.delete);

router.get('/topic/:tid/reply', user.checkLogin, reply.showCreate);
router.post('/topic/:tid/reply', user.checkLogin, reply.create);


//router.post('/topic/:tid/top', auth.adminRequired, topic.top);  // 将某话题置顶
//router.post('/topic/:tid/good', auth.adminRequired, topic.good); // 将某话题加精
//router.get('/topic/:tid/edit', auth.userRequired, topic.showEdit);  // 编辑某话题
//router.post('/topic/:tid/lock', auth.adminRequired, topic.lock); // 锁定主题，不能再回复
//
//router.post('/topic/:tid/delete', auth.userRequired, topic.delete);

// 保存新建的文章
//router.post('/topic/create', auth.userRequired, limit.peruserperday('create_topic', config.create_post_per_day), topic.put);
//
//router.post('/topic/:tid/edit', auth.userRequired, topic.update);
//router.post('/topic/collect', auth.userRequired, topic.collect); // 关注某话题
//router.post('/topic/de_collect', auth.userRequired, topic.de_collect); // 取消关注某话题

// reply controller
//router.post('/:topic_id/reply', auth.userRequired, limit.peruserperday('create_reply', config.create_reply_per_day), reply.add); // 提交一级回复
//router.get('/reply/:reply_id/edit', auth.userRequired, reply.showEdit); // 修改自己的评论页
//router.post('/reply/:reply_id/edit', auth.userRequired, reply.update); // 修改某评论
//router.post('/reply/:reply_id/delete', auth.userRequired, reply.delete); // 删除某评论
//router.post('/reply/:reply_id/up', auth.userRequired, reply.up); // 为评论点赞
//router.post('/upload', auth.userRequired, topic.upload); //上传图片


module.exports = router;
