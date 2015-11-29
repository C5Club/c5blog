/**
 * Created by maocg.
 * Date:2015/11/29.
 * Time:21:45.
 */
var mongoose = require('mongoose');
var BaseModel = require("./base");
var Schema = mongoose.Schema;

var UserSetSchema = new Schema({
    photo: { type: String},
    school: { type: String},
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }

});

UserSetSchema.plugin(BaseModel);

UserSetSchema.index({loginName: 1}, {unique: true});
UserSetSchema.index({email: 1}, {unique: true});

mongoose.model('UserSet', UserSetSchema);