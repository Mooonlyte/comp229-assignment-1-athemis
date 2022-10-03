// COMP229 Assignment 1 | index.js | Andreas Themistocles | 301251197 | October 3rd, 2022
var express = require('express');
var router = express.Router();

// GET Home page
router.get('/', function(req, res, next) {
  res.render('index', 
  { 
    title: 'Home',
  });
});

// GET Home page alternative
router.get('/home', function(req, res, next) {
  res.render('index', 
  { 
    title: 'Home',
  });
});

// POST Home page
router.post('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

// POST Home page alternative
router.post('/home', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

// GET Contact page
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

// GET About page
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
});

// GET Services page
router.get('/services', function(req, res, next) {
  res.render('services', { title: 'Services' });
});

// GET Projects page
router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Projects' });
});



module.exports = router;
