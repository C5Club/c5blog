/**
 * app config
 * @type {exports}
 */
var config = require('./config');
var path = require('path');
var express = require('express');
var session = require('express-session');
require('./middlewares/mongoose_log'); // 打印 mongodb 查询日志
require('./models/db');
var webRouter = require('./routes/routes');
var errorPageMiddleware = require('./middlewares/error_page');
var RedisStore = require('connect-redis')(session);
var _ = require('lodash');
var compress = require('compression');
var bodyParser = require('body-parser');
var busboy = require('connect-busboy');
var errorhandler = require('errorhandler');
var requestLog = require('./middlewares/request_log');
var renderMiddleware = require('./middlewares/render');
var logger = require('./config/logger');
var flash = require('connect-flash');

// 静态文件目录
var staticDir = path.join(__dirname, 'public');
var app = express();

// configuration in all env
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Request logger。请求时间
app.use(requestLog);

if (config.debug) {
    // 渲染时间
    app.use(renderMiddleware.render);
}
// 静态资源
app.use('/public', express.static(staticDir));

// 通用的中间件
app.use(require('response-time')());
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));
app.use(require('method-override')());
app.use(require('cookie-parser')(config.session_secret));
app.use(compress());
app.use(session({
    secret: config.session_secret,
    store: new RedisStore({
        port: config.redis_port,
        host: config.redis_host
    }),
    resave: true,
    saveUninitialized: true
}));
// set static, dynamic helpers
_.extend(app.locals, {
    config: config
});
app.use(function (req, res, next) {
    res.locals.user = req.session.user ? req.session.user : null;
    res.locals.error = req.session ? req.session.error : null;
    res.locals.success = req.session ? req.session.success : null;
    next();
});
// custom middleware
app.use(flash());
app.use(errorPageMiddleware.errorPage);
app.use(busboy({
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB
    }
}));

// routes
app.use('/', webRouter);

// error handler
if (config.debug) {
    app.use(errorhandler());
} else {
    app.use(function (err, req, res, next) {
        console.error('server 500 error:', err);
        return res.status(500).send('500 status');
    });
}
app.listen(config.port, function () {
    console.log('C5Club start----- on port', config.port);
    logger.log('You can debug your app with http://' + ':' + config.port);
});

module.exports = app;