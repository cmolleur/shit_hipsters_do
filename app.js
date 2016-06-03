// modules and middleware!
var express = require('express');
var app = express();

var morgan = require('morgan');
app.use(morgan('dev'));

app.set('view engine', 'ejs');

app.use(express.static('./public'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());

var mongoPath = 'mongodb://localhost/blogPosts';
var mongoose = require('mongoose');
mongoose.connect(mongoPath);

//routing!
app.get('/', function(req,res){
  res.render('index');
});

var blogPostsRouter = require('./routes/blogPosts');
app.use('/api/blogPosts', blogPostsRouter);

//listen!
var port = 8080;
app.listen(port, function(){
  console.log("...listening on port" + port);
});
