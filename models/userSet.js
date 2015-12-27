/**
 * Created by maocg.
 * Date:2015/11/29.
 * Time:21:45.
 */
var mongoose = require('mongoose');
var BaseModel = require("./base");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var UserSetSchema = new Schema({
    user_id: { type: ObjectId},
    photo: { type: String},
    hobby: { type: String},
    school: { type: String},
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    deleted: {type: Boolean, default: false}
});

UserSetSchema.plugin(BaseModel);

mongoose.model('UserSet', UserSetSchema);