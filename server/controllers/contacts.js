// COMP229 Assignment 2 | controllers/contacts.js | Andreas Themistocles | 301251197 | October 20th, 2022
let express = require('express')
let router = express.Router()
let mongoose = require('mongoose')

// Reference to contacts model
let Contact = require('../models/contacts')

// Controller for Contacts page
module.exports.displayContacts = function(req, res, next){
    Contact.find(function(err, contactList){
        if(err)
        {
            return console.error(err)
        }
        else
        {
            //console.log(ContactList)
            res.render('contacts/display_contacts', 
            {
                title: 'Contact List', 
                contactList: contactList, 
                displayName: req.user ? req.user.displayName : ''
            })
        }
    }).sort('firstName')
}

module.exports.displayAddPage = function(req, res, next){
    res.render('contacts/add', 
    {
        title: 'Add Contact',
        displayName: req.user ? req.user.displayName : ''
    })
}

module.exports.processAddPage = function(req, res, next){
    let newContact = Contact({
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "phone": req.body.phone,
        "email": req.body.email
    })

    Contact.create(newContact, function(err, Contact){
        if(err)
        {
            console.log(err)
            res.end(err)
        }
        else
        {
            res.redirect('/contacts')
        }
    })
}

module.exports.displayEditPage = function(req, res, next){
    let id = req.params.id

    Contact.findById(id, function(err, selectedContact){
        if(err)
        {
            console.log(err)
            res.end(err)
        }
        else
        {
            res.render('contacts/edit', 
            {
                title: 'Edit Contact', 
                contact: selectedContact, 
                displayName: req.user ? req.user.displayName : ''
            })
        }
    })
}

module.exports.processEditPage = function(req, res, next){
    let id = req.params.id

    let updatedContact = Contact({
        "_id": id,
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "phone": req.body.phone,
        "email": req.body.email
    })

    Contact.updateOne({_id: id}, updatedContact, function(err){
        if(err) 
        {
            console.log(err)
            res.end(err)
        }
        else 
        {
            res.redirect('/contacts')
        }
    })
}

module.exports.performDeletion = function(req, res, next){
    let id = req.params.id

    Contact.deleteOne({_id: id}, function(err){
        if(err)
        {
            console.log(err)
            res.end(err)
        }
        else
        {
            res.redirect('/contacts')
        }
    })
}