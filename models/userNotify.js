/**
 * Created by maocg.
 * Date:2016/2/23 0023.
 * Time:上午 10:50.
 *
 */

var mongoose = require('mongoose');
var BaseModel = require("./base");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var UserNotifySchema = new Schema({
    isRead: { type: Boolean, default: false},
    receiver: {type: ObjectId, required: true},//文章作者
    sender: {type: ObjectId, required: true},//评论的作者id
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }
});

UserNotifySchema.plugin(BaseModel);

mongoose.model('UserNotify', UserNotifySchema);
