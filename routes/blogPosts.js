//modules!
var express = require('express');
var router = express.Router();
var BlogPost = require('../models/blogPost');

//routing!
router.get('/', function(req, res){
  BlogPost.find({}, function(err, databaseBlogPosts){
    res.json({blogPosts: databaseBlogPosts});
  });
});

router.post('/', function(req, res){
  var blogData = req.body.blogPost;
  var blogPost = new BlogPost(blogData);
  blogPost.save(function(err, databaseBlogPost){
    res.json(databaseBlogPost)
  });
});

// DELETE
router.delete('/:id', function(req, res, next) {
  var id = req.params.id;
  BlogPost.findByIdAndRemove(id, function(err){
    if (err) {
      res.status(500).end();
    }else {
      res.status(204);
    }
  });

});

//exports!
module.exports = router;
