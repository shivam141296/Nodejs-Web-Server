const express = require('express');
var app = express();
const hbs = require('hbs');
const fs = require('fs');

//creating your own middleware for log files of request
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log',log + '\n', (err) => {
    if(err){
      console.log('Unable to append server.log');
    }
  });
  next();
});

//Uncomment this to create middleware for maintenance page
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });


//middleware for html file
app.use(express.static(__dirname + '/public'));

//hbs partials for common code throughout template
hbs.registerPartials(__dirname + '/views/partials');

//hbs helper functions tu use at different place
hbs.registerHelper('getCurrentYear', () =>{
  return new Date().getFullYear()
});

//hbs function for toUppercase
hbs.registerHelper('capitalise', (text) => {
  return text.toUpperCase();
})

app.set('view engine','hbs');

app.get('/about',(req, res) =>{
  res.render('home.hbs',{
    welcomeMessage: 'Welcome to About Page',
    pageTitle: 'About Page'
  });
});

app.get('/home',(req, res) =>{
  res.render('about.hbs',{
    welcomeMessage: 'Welcome to Home page',
    pageTitle: 'About Page',
  });
});

app.get('/',(req,res) =>{
  res.send({
    name: 'Shivam',
    likes: [
      'Biking',
      'Swimming'
    ]
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
