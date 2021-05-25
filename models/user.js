const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    // email: {
    //     type: String,
    //     required: true,
    //     unique: true
    // }
        email: {
        type: String,
        unique:true,
        required: 'Please enter your email',
        trim: true,
        lowercase:true
        // validate: [{ validator: value => isEmail(value), msg: 'Invalid email.' }]
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);