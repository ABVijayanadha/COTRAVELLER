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
	var id = mongoose.Types.ObjectId(req.params.userId);
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


router.put('/:userId',function(req,res){
	var user = req.body;
	var id = mongoose.Types.ObjectId(req.params.userId);
	updateUser(id,user,function(err, user){
		if(err){
			res.send(err);
		}else{
			res.send(user);
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
	User.findOne({_id: id},function(err, user) {
			if (err) callback(err);
			else if (!err && !user)
				callback('No User Found');
 			else
 				callback(user,err);
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


function updateUser(id, data, callback) {
	var query = {_id: id};
	var body = data;
	var updateUserQuery = User.findOneAndUpdate(query, body, {new: true});
	updateUserQuery.then(function(users){
		callback(null, users)
	}).catch(function(err){
		callback(err,[]);
	})
}
