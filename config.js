/**
 * Created by maocg.
 * Date:2015/11/19.
 * Time:21:49.
 */
var path = require('path');
var config = {
    name: 'c5blog',
    // mongodb 配置
    db: 'mongodb://127.0.0.1/blog',
    dbName: 'blog',
    debug: true,
    // redis 配置，默认是本地
    redis_host: '127.0.0.1',
    redis_port: 6379,
    redis_db: 0,
    // session
    session_secret: 'holly_secret', // 务必修改
    auth_cookie_name: 'node_club',

    // 程序运行的端口
    host: 'localhost',
    port: 3000,
    // 邮箱配置
    mail_opts: {
        host: 'smtp.163.com',
        port: 25,
        auth: {
            user: '13240105904@163.com',
            pass: 'jsuvdddnodfvjfyv'
        }
    }
}
module.exports = config;