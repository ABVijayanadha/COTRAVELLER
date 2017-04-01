var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	User = mongoose.model('User');

router.get('/',function(req,res){
    res.send('Finally I got it running......');
});

router.get('/all',function(req,res){
	findAllUsers(function(err,users){
		if(err){
			res.send(err);
		}
		res.send(users);
	})
});

router.get('/:userId',function(req,res){
	var id = req.params.userId;
	getUserById(id,function(err,user){
		if(err){
			res.send(err);
		}else{
			res.send(user);
		}
	});
});


module.exports = router;

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
	User.find({}, function(err, users){
        if(!err){
        	callback(null,users);
        }
        callback(err,[]);       
    });
}