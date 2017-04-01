var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	User = mongoose.model('User');


router.get('/',function(req,res){
	findAllUsers(function(err,users){
		if(err){
			res.send(err);
		}
		res.send(users);
	})
});

router.get('/:userId',function(req,res){
	var id = parseInt(req.params.userId);
	getUserById(id,function(err,user){
		if(err){
			res.send(err);
		}else{
			res.send(user);
		}
	});
});

router.post('/',function(req,res){
	var user = req.body;
	saveUser(user,function(err){
		if(err){
			res.send(err);
		}else{
			res.send('Success');
		}
	});
});


module.exports = router;


function saveUser(data,callback) {
	var user = new User(data);
	user.save()
		.then(function(){
			callback();
		}).catch(function(err){
			callback(err);
		});
}

function getUserById(id,callback){
	User.findOne({_id: id})
		.exec(function(err, user) {
			if (err) callback(err);
			else if (!err && !user) 
				callback('No User Found');
 			else
 				callback(null,err);
        });
}


function findAllUsers(callback) {
	var getUser = User.find({}).exec();
	getUser.then(function(users){
		callback(null,users);
	}).catch(function(err){
		callback(err,[]);   
	});
}