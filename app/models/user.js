var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Bcrypt = require('bcrypt');

var UserSchema = new Schema({
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
	salt: { type: String },
    hash: { type: String }
});


UserSchema.virtual('password')
    .get(function () { return this._password; })
    .set(function (passwd) {
        this.salt = Bcrypt.genSaltSync(10);
        this._password = passwd;
        this.hash = Bcrypt.hashSync(passwd, this.salt);
    });

UserSchema.method('verifyPassword', function (password, done) {
    Bcrypt.compare(password, this.hash, done);
});


mongoose.model('User', UserSchema);