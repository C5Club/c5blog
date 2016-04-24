var mongoose = require('mongoose');
var BaseModel = require("./base");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    nick: { type: String},
    loginName: { type: String},
    password: { type: String },
    email: { type: String},
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    deleted: {type: Boolean, default: false}
});

UserSchema.plugin(BaseModel);

UserSchema.index({loginName: 1}, {unique: true});
UserSchema.index({email: 1}, {unique: true});

mongoose.model('User', UserSchema);
