var express = require('express')
  , router = express.Router();

router.get('/',function(req,res){
    res.send('Finally I got it running......');
});


module.exports = router;