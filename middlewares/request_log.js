var logger = require('../config/logger');

module.exports = function(req, res, next) {
    // Assets do not out log.
    if (exports.ignore.test(req.url)) {
        next();
        return;
    }

    var t = new Date();
    logger.request.log('\n\nStarted', t.toISOString(), req.method, req.url, req.ip);

    res.on('finish', function() {
        var duration = ((new Date()) - t);
        logger.request.log('Completed', res.statusCode, ('(' + duration + 'ms)'));
    });
    next();
};

exports.ignore = /^\/(public|agent)/;