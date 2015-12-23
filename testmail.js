/**
 * Created by maocg.
 * Date:2015/12/14 0014.
 * Time:上午 9:49.
 */
var config = require('./config');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
// create reusable transporter object using SMTP transport
//var transporter = nodemailer.createTransport({
//    service: 'Gmail',
//    auth: {
//        user: 'maochunguang0201@gmail.com',
//        pass: '88mm0201'
//    }
//});
var transporter = nodemailer.createTransport(smtpTransport({
    host: 'smtp.163.com',
    port: 25,
    auth: {
        user: '13240105904@163.com',
        pass: 'jsuvdddnodfvjfyv'
    }
}));

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
var html = '<p>您好：' + config.name + '</p>' +
    '<p>我们收到您在' + config.name + '的注册信息，请点击下面的链接来激活帐户：</p>' +
    '<a href  = "' + '/active_account?key=' + '&name=' + '">激活链接</a>' +
    '<p>若您没有在' + config.name + '社区填写过注册信息，说明有人滥用了您的电子邮箱，请删除此邮件，我们对给您造成的打扰感到抱歉。</p>' +
    '<p>' + config.name + '社区 谨上。</p>';
var mailOptions = {
    from: '13240105904@163.com', // sender address
    to: 'maocg@hollycrm.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ✔', // plaintext body
    html: html // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);

});