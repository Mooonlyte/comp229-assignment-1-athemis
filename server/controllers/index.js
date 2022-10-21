// COMP229 Assignment 2 | controllers/index.js | Andreas Themistocles | 301251197 | October 20th, 2022
let express = require('express')
let router = express.Router()
let mongoose = require('mongoose')
let passport = require('passport')

// Create user model
let userModel = require('../models/user')
let User = userModel.User

module.exports.displayHomePage = function(req, res, next) {
    res.render('index', {title: 'Home', displayName: req.user ? req.user.displayName : ''})
}

module.exports.displayContactPage = function(req, res, next) {
    res.render('contact', { title: 'Contact', displayName: req.user ? req.user.displayName : '' })
}

module.exports.displayAboutPage = function(req, res, next) {
    res.render('about', { title: 'About', displayName: req.user ? req.user.displayName : '' })
}

module.exports.displayServicesPage = function(req, res, next) {
    res.render('services', { title: 'Services', displayName: req.user ? req.user.displayName : '' })
}

module.exports.displayProjectsPage = function(req, res, next) {
    res.render('projects', { title: 'Projects', displayName: req.user ? req.user.displayName : '' })
}

module.exports.displayLoginPage = function(req, res, next) {
    // check if user is already logged in
    if(!req.user){
        res.render('auth/login', 
        {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        })
    }
    else {
        return res.redirect('/')
    }
    
}

module.exports.processLoginPage = function(req, res, next) {
    passport.authenticate('local',
    function(err, user, info){
        // server error
        if(err) {
            return next(err)
        }
        // login error
        if(!user) {
            req.flash('loginMessage', 'Authentication Error')
            return res.redirect('/login')
        }
        req.login(user, function(err){
            if(err){
                return next(err)
            }
            return res.redirect('/contacts')
        })
    })(req, res, next)
}

module.exports.displayRegisterPage = function(req, res, next){
    // check if user is already logged in
    if(!req.user) {
        res.render('auth/register', 
        {
            title: "Register",
            messages: req.flash('registerMessage'),
            display: req.user ? req.user.displayName : ''
        })
    }
    else {
        return res.redirect('/')
    }
}

module.exports.processRegisterPage = function(req, res, next){
    // user object
    let newUser = new User({
        username: req.body.username,
        //password: req.body.password,
        email: req.body.email,
        displayName: req.body.displayName
    })

    User.register(newUser, req.body.password, function(err){
        if(err){
            console.log("Error: Inserting New User")
            if(err.name == "UserExistsError") {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists'
                )
                console.log('Error: User Already Exists')
            }
            return res.render('auth/register', 
            {
                title: "Register",
                messages: req.flash('registerMessage'),
                display: req.user ? req.user.displayName : ''
            })
        }
        else {
            // if no error exists, registration is successfull

            // redirect the user and authenticate

            return passport.authenticate('local')(req, res, () => {
                res.redirect('/contacts')
            })
        }
    })
}

module.exports.performLogout = function(req, res, next){
    req.logout(function(err){
        if(err) {
            return next(err)
        }
        res.redirect('/')
    })
}