//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose=require("mongoose");
const _ = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
mongoose.connect("mongodb://0.0.0.0:27017/blogDb");
const blogschema= new mongoose.Schema({
  title:String,
  content:String
});
const Blog=mongoose.model("Blog",blogschema);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",function(req,res){
  Blog.find()

  .then(function(posts)
  {

    
      res.render("home", {
  
        Content: homeStartingContent,
   
        posts: posts
   
        });
    })
  })
  


app.get("/contact",function(req,res){
  res.render("contact",{contContent:contactContent});

});
app.get("/about",function(req,res){
  res.render("about",{abtContent:aboutContent});

});
app.get("/compose",function(req,res){
  res.render("compose");

});
app.post("/compose",function(req,res)
{
  
 // console.log(req.body.ulu);
 // now we will be creating a key value pairs to store things in one object
 const post= new Blog({
  title:req.body.ulu,
  content:req.body.Postbody
 });
 post.save()

  .then(function(post){
    res.redirect("/");
  })

});

// now instead of creating more and more get request for all pages we can create a single dynamic object which can help us creating multiple pages in single get
app.get("/posts/:postId",function(req,res){
 // console.log(req.params.postName); // remeber to write exact 
 const requestedpostId=req.params.postId;
  // now we will be trying to make a connection between what we write as title and the url 
 /* const requistedTitle=_.lowerCase(req.params.postName); // _lowercase is a lodash module which is used because when we have a titlr 
  // which have 2 or 3 words then we cant request the url by writing it with /post  because it will be diffferent
  // so what we do is eg- title is hii buddy so in url we can write as /post/:hii-buddy
  // now we need to acess the title we entered
  posts.forEach(function(post){
    const storedtitle=_.lowerCase(post.title);
    if(requistedTitle===storedtitle)
   /* {
      console.log("match found");

    }
    else{
      console.log("not found");
    }*/
    Blog.findOne({_id:requestedpostId})
    .then(function(post){
      res.render("post",{
        title:post.title,
        content:post.content
  
      
      });
    });
  });


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
