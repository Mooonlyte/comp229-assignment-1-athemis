// COMP229 Assignment 2 | routes/contacts.js | Andreas Themistocles | 301251197 | October 20th, 2022
let express = require('express')
let router = express.Router()
let mongoose = require('mongoose')

let passport = require('passport')

// Connect to contacts controller
let contactsController = require('../controllers/contacts')
// Guard function
function requireAuth(req, res, next) {
    // check if user is logged in
    if(!req.isAuthenticated()) {
        return res.redirect('/login')
    }
    next()
}

// GET route for displaying contacts page
router.get('/', contactsController.displayContacts)

// GET route for displaying add page
router.get('/add', requireAuth, contactsController.displayAddPage)

// POST route for processing add page
router.post('/add', requireAuth, contactsController.processAddPage)

// GET route for displaying edit page
router.get('/edit/:id', requireAuth, contactsController.displayEditPage)

// POST route for processing edit page
router.post('/edit/:id', requireAuth, contactsController.processEditPage)

// GET router for performing deletion
router.get('/delete/:id', requireAuth, contactsController.performDeletion)


module.exports = router