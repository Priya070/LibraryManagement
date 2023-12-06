const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 20,
    },
    emailId: {
        type: String,
        // required: [true, 'Email field is required'],
        unique: true,
        trim: true,
        maxlength: 50,
    },
    password: {
        type: String,
        required: [true, 'Password field is required'],
        minlength: 6,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;