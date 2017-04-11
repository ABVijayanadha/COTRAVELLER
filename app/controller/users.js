var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	User = mongoose.model('User');

var UserService = require('./../services/userService.js');
var userService = new UserService();

router.get('/',function(req,res){
	userService.getAll().then(function(users){
		res.send(users);
	}).catch(function(error){
		res.send(error);
	});
});

router.get('/:userId',function(req,res){
	var id = mongoose.Types.ObjectId(req.params.userId);
	userService.getById(id).then(function(user){
		res.send(user);
	}).catch(function(error){
		res.send(error);
	});
		
});


router.post('/',function(req,res){
	var user = req.body;
	userService.save(user).then(function(){
		res.send('Success');
	}).catch(function(err){
		res.send(err);
	});
});


router.put('/:userId',function(req,res){
	var user = req.body;
	var id = mongoose.Types.ObjectId(req.params.userId);
	userService.update(id,user).then(function(user){
		res.send(user);
	}).catch(function(error){
		res.send(error);
	});
});

router.delete('/:userId',function(req,res){
	var id = mongoose.Types.ObjectId(req.params.userId);
	userService.remove(id).then(function(user){
		res.send(user);
	}).catch(function(error){
		res.send(error);
	});
});


module.exports = router;