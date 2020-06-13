var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/api/signup',(req ,res, next)=>{
  bcrypt.hash(req.body.password,10)
    .then(hash=>{
      const user = new User({
        fullname: req.body.fullname,
        password:hash,
        mobileno : req.body.mobileno,
        emailid : req.body.emailid
      });
      user.save()
      .then(result=>{
        res.status(201).json({
          message:"User created successfully",
          result : result
        })
      }).catch(err=>{
        res.status(500).json({
          error: err
        });
      });
    });

})

module.exports = router;


// cpassword: "12345"
// ​email: "as@dsf.com"
// ​
// fullname: "gautam"
// ​
// mobileNo: "123456789"
// ​
// password: "12345"