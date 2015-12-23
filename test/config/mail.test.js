/**
 * Created by maocg.
 * Date:2015/12/13 0013.
 * Time:下午 2:17.
 */
var mail = require('../../config/mail');

describe('test/config/mail.test.js', function () {
    describe('sendActiveMail', function () {
        it('should ok', function () {
            mail.sendActiveMail('maocg@hollycrm.com', 'token', 'maocg');
        });
    });

    describe('sendResetPassMail', function () {
        it('should ok', function () {
            mail.sendResetPassMail('maocg@hollycrm.com', 'token', 'maocg');
        });
    });

});
