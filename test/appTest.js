/**
 * Created by maocg.
 * Date:2015/11/20.
 * Time:9:39.
 */
var bcrypt = require('bcryptjs');
bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash('B4c0/\/', salt, function(err, hash) {
        // Store hash in your password DB.
        console.log(salt);
    });
});

//redis test


// mongo test