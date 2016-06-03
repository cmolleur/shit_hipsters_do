console.log("...loaded");

function createBlogPost(blogPostData, callback){
  callback = callback || function(){};
  $.ajax({
    method: 'post',
    url: '/api/blogPosts',
    data: {blogPost: blogPostData},
    success: function(data){
      callback(data);
    }
  });
}

function getAllPosts(callback){
  callback = callback || function(){};
  $.ajax({
    url: '/api/blogPosts',
    success: function(data){
      var blogPosts = data.blogPosts;
      callback(blogPosts);
    }
  })
}

function renderBlogPost(blogPost){
  var $el = $("<li>").addClass('blogPost');
  $el.append( $("<h5>").text(blogPost.title) );
  $el.append( $("<p>").text(blogPost.time) );
  $el.append( $("<p>").text(blogPost.description).addClass('description') );
  $el.append( $("<p>").text( "#" + blogPost.category ).addClass('category') );
  return $el;
}

function renderBlostPostList(blogPosts, $list){
  $list.empty();
  var blogPost, $el;
  for (var i = 0; i < blogPosts.length; i++) {
    blogPost = blogPosts[i];
    $el = renderBlogPost(blogPost);
    $list.append($el);
  }
}

// helpful behaviors
// ----------------------
// how does it affect this application??


function setBlogPostFormHandler(){
  $('form#post-generator').on('submit', function(e){
    e.preventDefault();
    var newTitle = $(this).find('input[name="title"]').val();
    var newDescription = $(this).find('textarea[name="description"]').val();    var newCategory = $(this).find('select[name="category"]').val();
    var blogPostData = {title: newTitle, description: newDescription, category: newCategory};
    createBlogPost(blogPostData, function(data){
      updateBlogPostAndView();
    });
  });
}

function updateBlogPostAndView(){
  getAllPosts(function(blogPosts){
    renderBlostPostList(blogPosts, $("ul#blog-posts"));
  });
}

$(function(){

  setBlogPostFormHandler();
  updateBlogPostAndView();

})
