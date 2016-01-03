/**
 * Created by maocg.
 * Date:2015/11/29.
 * Time:22:00.
 */
var mongoose = require('mongoose');
var BaseModel = require("./base");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ReplySchema = new Schema({
    content: { type: String },
    topic_id: { type: ObjectId},
    user_id: { type: ObjectId },
    nick: {type: String},
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    deleted: {type: Boolean, default: false}
});

ReplySchema.plugin(BaseModel);
ReplySchema.index({topic_id: 1});
ReplySchema.index({author_id: 1, create_at: -1});

mongoose.model('Reply', ReplySchema);
