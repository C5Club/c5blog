var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.db, {
    server: {poolSize: 20}
}, function (err) {
    if (err) {
        console.error('connect to %s error: ', config.db, err.message);
        process.exit(1);
    }
    console.log('mongo connect success!')
});

require('./user');
require('./userSet');
require('./topic');
require('./reply');

exports.User = mongoose.model('User');
exports.UserSet = mongoose.model('UserSet');
exports.Topic = mongoose.model('Topic');
exports.Reply = mongoose.model('Reply');

