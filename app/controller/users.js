var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	multer = require('multer'),
	User = mongoose.model('User');

var UserService = require('./../services/userService.js');
var userService = new UserService();
/*
storage : multer configuration that defines the destination to upload
file and function to sets the file name
*/
var storage = multer.diskStorage({
  destination: 'uploads/profile-images',
  filename: function (req, file, cb) {
    cb(null, file.fieldname +'-'+'.jpg');
  }
});

/*
'profile-pic' : the key to which the file needs to be attached
*/
var upload = multer({ storage: storage }).single('profile-pic');

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

//TODO: add image uri in User model and update it with the file url
router.post('/profile',function(req,res){
	upload(req, res, function (err) {
    if (err) {
      return err;
    } else{
			if(!req.file){
				res.json({
					status: 1,
					message:"No file provided"
				});
			} else{
				res.json({
					status: 3,
					message:"Image uploaded successfully!",
					imageURL: req.file.filename
				});
			}

		}

  })
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
