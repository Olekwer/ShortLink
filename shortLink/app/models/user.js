/**
 * Created by Oleg on 03.09.2016.
 */
var mongoose=require('../libs/mongoose');
var bcrypt=require('bcrypt-nodejs');
var Schema=mongoose.Schema;
var jwt = require('jsonwebtoken');
var config=require('../config');
var UserSchema= new Schema({
    name: {
        type: String,
        required:true
    },
    username: {
        type: String,
        required:true,
        index:{
            unique:true,
            sparse: true
        }
    },
    password:{
        type: String,
        required: true,
        select: false
    }
});

UserSchema.pre('save', function(next) {
    var user = this;

    if (!user.isModified('password')) return next();
    bcrypt.hash(user.password, null, null, function(err, hash) {
        if (err) return next(err);

        user.password = hash;
        next();
    });
});

UserSchema.methods.comparePassword = function(password) {
    var user = this;

    return bcrypt.compareSync(password, user.password);
};

UserSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        name: this.name,
        username: this.username,
        exp: parseInt(expiry.getTime() / 1000),
    }, config.get('webtoken:secret'));
};

module.exports = mongoose.model('User', UserSchema);