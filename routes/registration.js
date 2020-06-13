var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var multer = require('multer');
var Register = require('../models/registration');

var checkAuth = require('../middleware/check-auth');


var ID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  };

const MIME_TYPE_MAP = {
  'image/png':'png',
  'image/jpeg':'jpg',
  'image/jpg':'jpg'
};

var storage = multer.diskStorage({

  destination: (req,file,cb)=>{
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Valid mime type");
    console.log("printing is valid ",isValid);
    if(isValid){
      error = null;
      
    }
    
    cb(error,"public/idproofs")
  },
  filename: (req,file,cb)=>{
      console.log("Hello file",file);
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name+'-'+Date.now()+'-'+ext);
    console.log(Date.now());
  }
});



/* GET users listing. */
router.get('/', function(req, res, next) {
  Register.find().then(participants=>{
      res.status(200).json({
          message:"Fetched data successfully",
          posts: participants,
          totalReg: participants.length
      });
  });
});


router.get('/:eventid', function(req, res, next) {
  Register.find({'eventid':req.params.eventid}).then(participant=>{
    res.status(200).json({
      message:"Fetched data successfully",
      posts: participant
    });
  });
});

router.get('/register/:regnum',(req,res,next)=>{
  Register.find({'regnum':req.params.regnum}).then(participant=>{
    res.status(200).json({
      message:"Fetched Successfully",
      post : participant
    });
  });
});

router.post('/api/register',multer({storage: storage}).single("image"),(req ,res, next)=>{
  const url = req.protocol + '://'+ req.get("host");
    const d = new Date();
    const todayDate = `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`
    console.log("My url :",url);
    console.log("Files ",req.file)
    console.log("reqfiles ",req.body);
    console.log("type:",req.body.regtype);
    console.log("totaltickets :",req.body.ticketcount)
    const regUser = new Register({
        regnum : ID(),
        date : todayDate,
        eventName: req.body.eventName,
        fullname: req.body.fullname,
        mobileno:req.body.mobileno,
        emailid: req.body.emailid,
        regtype: req.body.regtype,
        totaltickets:req.body.ticketcount,
        idproof: url + '/idproofs/'+ req.file.filename,
        userid : req.body.userid,
        eventid : req.body.eventId
    })
    console.log("Your request updated",regUser);
    regUser.save().then(registered=>{
        res.status(201).json({
            message:"Successfully Registered",
            // userRegistered:{
            //     ...registered,
            //     id:registered._id
            // },
            regnum :registered.regnum
        })
    });

})

module.exports = router;


