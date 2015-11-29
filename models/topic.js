/**
 * Created by maocg.
 * Date:2015/11/29.
 * Time:21:54.
 */
var mongoose  = require('mongoose');
var BaseModel = require("./base_model");
var Schema    = mongoose.Schema;
var ObjectId  = Schema.ObjectId;
var config    = require('../config');

var TopicSchema = new Schema({
    title: { type: String },
    content: { type: String },
    author_id: { type: ObjectId },
    reply_count: { type: Number, default: 0 },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    deleted: {type: Boolean, default: false}
});

TopicSchema.plugin(BaseModel);
TopicSchema.index({create_at: -1});
TopicSchema.index({author_id: 1, create_at: -1});


mongoose.model('Topic', TopicSchema);
