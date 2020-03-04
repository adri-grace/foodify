const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 6;

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: String
}, {
    timestamps: true
});

userSchema.methods.comparePassword = function (tryPassword, callback) {
    bcrypt.compare(tryPassword, this.password, callback)
}

userSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.password
        delete ret.createdAt
        delete ret.updatedAt
        delete ret.__v
    }
});

//create a pre-action that checks to see if the password has been modified (which includes cpassword creation)
userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    //Hash and salt the password
    bcrypt.hash(user.password, SALT_ROUNDS, function (err, hash) {
        if (err) return next(err);
        //replace the user-provided password with the hash
        user.password = hash;
        next(); // next just means next process, which will be to commit this to the database
    });
});

module.exports = mongoose.model('User', userSchema);