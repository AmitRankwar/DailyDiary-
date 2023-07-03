//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = " Welcome to Personal Diary of mine. In this personal diary we can add our incident by giving them a title to do so just click on COMPOSE button in navbar created using bootstrap.This web app is created using HTML , Bootstrap , JavaScript  & NPM modules like express, body-parser , ejs and mongoose. ";
const aboutContent = "This Personal Diary is created using refernce from Dr. Angela Yu's Web Development Bootcamp 2023. By just clicking on COMPOSE button in navbar we can post our content with a title of desired on webiste and this web app is crated using HTML , Bootstrap , JavaScript  & NPM modules like express, body-parser , ejs and mongoose. Using NPM packages for Node.js allows developers to easily include and manage external modules in their projects. These packages, which are published on the NPM registry, can provide additional functionality or utilities that would be time-consuming or difficult to implement from scratch. Additionally, using packages from the NPM registry allows developers to benefit from the work of other developers and easily share and collaborate on their own code..";
const contactContent = "Hello everyone myself AMIT CHAUDHARY RANKWAR. email: amit.2***9@knit.ac.in , Mob Number: 86303836** .";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
