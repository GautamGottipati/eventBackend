var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var path =  require('path')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var eventsRouter = require('./routes/events');
var userRouter = require('./routes/user');
var registration = require('./routes/registration')


var app = express();

mongoose.connect('mongodb+srv://gautam_123:bAYTtOAxN7u5fNYP@cluster0-j2h4t.mongodb.net/eventApp?retryWrites=true&w=majority', { useNewUrlParser: true,useUnifiedTopology: true })
.then(()=>{
  console.log("Connected to database!!");
})
.catch(()=>{
  console.log("Connection Failed");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use("/images",express.static(path.join(__dirname,"/public")));
app.use("/",express.static(path.join(__dirname,"angular")));

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*")
  res.setHeader(
    "Access-Control-Allow-Headers",
  "Origin,X-Requested-With,Content-Type,Accept , Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH,DELETE, OPTIONS, PUT ");
  next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/events',eventsRouter);
app.use('/user',userRouter);
app.use('/registration',registration);

app.use((req,res,next)=>{
  res.sendFile(path.join(__dirname,"angular","index.html"))
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
