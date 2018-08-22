const express = require('express');
const app = express();
const path = require('path');
const parser = require('body-parser');

//Use middleware for static files
app.use(express.static(path.resolve(__dirname + '/public')));

//Set the directory for the views
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Create a global array to store the data  we want to publish
let entries = [];
app.locals.entries = entries;

//Use body-parser to get the data from the form via post
app.use(parser.urlencoded({ extended: false }));

//Get main page
app.get('/', (req,res) => {
  res.render('index',{
      title: 'Home page',
      header: 'Customer  reviews'
  });
});

//Get post reviews page
app.get('/postReview', (req,res) => {
  res.render('postReview',{
      title: 'Post a review',
      header: 'Write a review'
  });
});

//Get content from the form and store in the global array
app.post('/postReview', (req,res) => {
  if (!req.body.title || !req.body.body) {
      res.status(400).send('Entries must have a title and body');
  }
  entries.push({
  title: req.body.title,
  content: req.body.body,
  published: new Date()
  });
  res.redirect('/');
});


//Display 404 error if the page requested is not available
app.use((req,res) => {
  res.status(404).render("404", {title: '404'});
});

//Display the content in the port 3000 in the browser
app.listen(3000);
