//modules!
var mongoose = require('mongoose');

//schema!
var BlogSchema = mongoose.Schema({
  title: {type: String},
  description: {type: String},
  category: {type: String},
  time: { type : Date, default: Date.now }
});

//exports!
module.exports = mongoose.model('BlogPost', BlogSchema);
