var mongoose = require('mongoose');
var BaseModel = require("./base");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    nick: { type: String},
    loginName: { type: String},
    password: { type: String },
    email: { type: String},
    active: { type: Boolean, default: false },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }

});

UserSchema.plugin(BaseModel);

UserSchema.index({loginname: 1}, {unique: true});
UserSchema.index({email: 1}, {unique: true});

mongoose.model('User', UserSchema);
