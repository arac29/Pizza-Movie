var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
//ADDED Stuff--------------------
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();
app.get('/', function(req, res){
  res.render('form');
});
app.set('view engine', 'pug');
app.set('views', './views');

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

app.post('/', function(req, res){
   console.log(req.body);
   res.send("recieved your request!");
});
//--------------------------------

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var resultRouter= require('./routes/result');

var app = express();

//NEWWWWWWWWWWWWWW
let http = require('http');
let router = require('./routes');
let handleRequest = (request, response) => {
  response.writeHead(200, {
      'Content-Type': 'text/html'
  });

};

http.createServer(router.handleRequest).listen(3000);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/result', resultRouter);

// -------------- index pageee
app.get('/',function(req,res){
  
  
  res.render('views/index');
});
//------------- result page
app.get('/result',function(req,res){
  res.render('views/result')
});

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
