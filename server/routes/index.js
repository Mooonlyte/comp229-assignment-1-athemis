// COMP229 Assignment 2 | routes/index.js | Andreas Themistocles | 301251197 | October 20th, 2022
let express = require('express');
let router = express.Router();

// Connect to index controller
let indexController = require('../controllers/index')

// GET Home page
router.get('/', indexController.displayHomePage)

// GET Home page alternative
router.get('/home', indexController.displayHomePage)

// POST Home page
router.post('/', indexController.displayHomePage)

// POST Home page alternative
router.post('/home', indexController.displayHomePage)

// GET Contact page
router.get('/contact', indexController.displayContactPage);

// GET About page
router.get('/about', indexController.displayAboutPage);

// GET Services page
router.get('/services', indexController.displayServicesPage);

// GET Projects page
router.get('/projects', indexController.displayProjectsPage);

// GET route for displaying login page
router.get('/login', indexController.displayLoginPage)

// POST route for processing login page
router.post('/login', indexController.processLoginPage)

// GET route for displaying register page
router.get('/register', indexController.displayRegisterPage)

// POST route for processing register page
router.post('/register', indexController.processRegisterPage)

// GET router for performing logout
router.get('/logout', indexController.performLogout)


module.exports = router;
