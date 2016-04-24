var logger = require('log4js');
var __baseDir = __dirname + '/../';
logger.configure({
    appenders: [{
        type: 'console'
    }, {
        type: 'file',
        filename: __baseDir + 'log/app.log',
        maxLogSize: 20480000,
        backups: 20,
        category: 'app'
    }, {
        type: 'file',
        filename: __baseDir + 'log/request.log',
        maxLogSize: 20480000,
        backups: 20,
        category: 'request'
    }, {
        type: 'file',
        filename: __baseDir + 'log/mongodb.log',
        maxLogSize: 20480000,
        backups: 20,
        category: 'db'
    }],
    replaceConsole: true
});

var appLog = {
    app: logger.getLogger("app"),
    request: logger.getLogger("request"),
    db: logger.getLogger("db")
};


module.exports = appLog;