/**
 * Created by maocg.
 * Date:2016/1/13 0013.
 * Time:下午 10:56.
 */
/*
var should = require('should');
var app = require('../../app');
var request = require('supertest')(app);
var pedding = require('pedding');
var User = require('../../dao/userDao');
var ReplyModel = require('../../models/db').Reply;

describe('test/controllers/user.test.js', function () {
    var testUser;
    before(function (done) {
        done = pedding(done, 2);
        support.ready(done);
        support.createUser(function (err, user) {
            testUser = user;
            done(err);
        });
    });

    describe('#index', function () {
        it('should show user index', function (done) {
            request.get('/user/' + testUser.loginname)
                .expect(200, function (err, res) {
                    var texts = [
                        '注册时间',
                        '这家伙很懒，什么个性签名都没有留下。',
                        '最近创建的话题',
                        '无话题',
                        '最近参与的话题',
                        '无话题'
                    ];
                    texts.forEach(function (text) {
                        res.text.should.containEql(text);
                    });
                    done(err);
                });
        });
    });
})*/
