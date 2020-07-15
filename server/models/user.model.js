var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        default : 'User' + 1
    },
    email : {
        type : String,
        trim : true,
        required : true,
        unique : true
    },
    password : {
        type : String,
        trim : true,
        required : true,
        minlength: 6
    },
    // password_confirm : {
    //     type :  String,
    //     trim : true,
    //     required : true,
    //     minlength : 6
    // }
});

module.exports = mongoose.model('User', userSchema);

