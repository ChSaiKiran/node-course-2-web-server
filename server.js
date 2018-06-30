 const express = require('express');
 const hbs = require('hbs');
 const fs = require('fs');

 var app = express();

 hbs.registerPartials(__dirname + '/views/partials');
 app.set('View Engine', 'hbs');


 app.use((req, res, next) => {
   var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
   console.log(log);
   fs.appendFile('server.log', log + '\n', (err) => {
     if(err) {
       console.log('unable to append to server.log');
     }
   });
   next();
 });

// app.use((req, res,next) => {
//   res.render('maint.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
   return new Date().getFullYear();
 });

 hbs.registerHelper('screamIt', (text) => {
   return text.toUpperCase();
 });

 app.get('/', (req, res)=> {
   // res.send('<H1>Hello Express !</H1>');
  res.render('home.hbs', {
     pageTitle: 'Welcome to Home Page',
     welcomeMsg: 'Welcome Template concept',
     // currentYear: new Date().getFullYear()
  });
 });

 app.get('/about', (req, res) => {
   // res.send('About Page');
   res.render('about.hbs', {
     pageTitle: 'SaiKiran About Page',
     // currentYear: new Date().getFullYear()
   });
 });

 app.get('/bad', (req, res) => {
   res.send({
     error: '404',
     Details: [
       'Invalid Data',
       'Handle all possible data conditions'
     ]
   });
 })



 app.listen(3000, () => {
   console.log('Server is up on port 3000');
 });
