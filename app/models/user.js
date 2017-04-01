var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto');

var UserSchema = mongoose.model('User',new Schema({
	firstName :{
		type:String,
		required:true
	},
	lastName:{
		type:String
	},
	email:  {
        type: String,
        required: true,
        unique: true
    },
	hashed_password: String,
    provider: String,
    salt: String,
}));


 module.exports = UserSchema;