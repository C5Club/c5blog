/**
 * Created by maocg.
 * Date:2015/11/19.
 * Time:21:49.
 */
var path = require('path');
var config = {
    name: 'c5blog',
    // mongodb 配置
    db: 'mongodb://127.0.0.1/app',
    dbName: 'app',
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
        host: 'smtp.qq.com',
        port: 465,
        auth: {
            user: '915881127@qq.com',
            pass: '88mm0201'
        }
    },
    // 文件上传配置
    upload: {
        path: path.join(__dirname, 'public/upload/'),
        url: '/public/upload/'
    }
}
if (process.env.NODE_ENV === 'test') {
    config.db = 'mongodb://127.0.0.1/node_club_test';
}
module.exports = config;