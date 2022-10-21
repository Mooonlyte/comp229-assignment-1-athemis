// COMP229 Assignment 2 | models/contact.js | Andreas Themistocles | 301251197 | October 20th, 2022
let mongoose = require('mongoose')

// Create model class
let contactsModel = mongoose.Schema({
    firstName: String,
    lastName: String,
    phone: String,
    email: String
},
{
    collection: "contacts"
})

module.exports = mongoose.model('Contacts', contactsModel)