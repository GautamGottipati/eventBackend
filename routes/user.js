var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');

var skey = '#$123)98778#$@&vladi(87vo$^st&&&ck';

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  
  User.find().then(user=>{
    res.status(200).json({
      message:"Successfully fetched all users",
      user: user,
      totalusers : user.length
    });
  });
});

router.post('/api/signup',(req ,res, next)=>{
    console.log("came buddy",req.body);
  bcrypt.hash(req.body.password,10)
    .then(hash=>{
      const user = new User({
        fullname: req.body.fullname,
        password:hash,
        mobileno : req.body.mobileNo,
        emailid : req.body.email,
      });
      console.log(user)
      user.save()
      .then(result=>{
        res.status(201).json({
          message:"User created successfully",
          result : result,
          usertype: result.usertype
        })
      }).catch(err=>{
        res.status(500).json({
            message: "Invalid Authentication Credentials!"
        });
      });
    });

})

router.post('/api/login',(req,res,next)=>{
    let fetchedUser
    console.log("Hello loger",req.body);
    User.findOne({emailid: req.body.email})
    .then(user=>{
        console.log("Entered into user",user);
        if(!user){
            console.log("You are null");
            return res.status(401).json({
                message: "Auth failed"
            })
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password , user.password);
    })
    .then(result=>{
        console.log("Entering result",result);
        if(!result){
            console.log("Came in hole");
            res.status(500).json({
                error: err
              });
        }
        // if we found the user successfully , we will create json web token here
        const token = jwt.sign({fullname:fetchedUser.fullname,email:fetchedUser.emailid ,userId: fetchedUser._id }, skey,{expiresIn:"1h"});
        console.log("want token ",token );
        res.status(200).json({
            token: token,
            expiresIn: 3600 ,//seconds
            userId : fetchedUser._id,
            usertype : fetchedUser.usertype
        });
    })
    .catch(err=>{
        res.status(401).json({
            message: "Invalid Authentication Credentials!"
          });
    });
});

module.exports = router;


// cpassword: "12345"
// ​email: "as@dsf.com"
// ​
// fullname: "gautam"
// ​
// mobileNo: "123456789"
// ​
// password: "12345"