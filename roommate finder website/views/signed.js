const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

// create a new Schema object
const authSchema = new Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    
});

authSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Auth', authSchema); 
