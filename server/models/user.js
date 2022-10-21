
// COMP229 Assignment 2 | models/user.js | Andreas Themistocles | 301251197 | October 20th, 2022
// require modules for the user model
let mongoose = require('mongoose')
let passportLocalMongoose = require('passport-local-mongoose')

let User = mongoose.Schema(
    {
        username: 
        {
            type: String,
            default: "",
            trim: true,
            required: 'Username is required'
        },
        /*
        password:
        {
            type: String,
            default: '',
            trim: true,
            required: "Password is required"
        }
        */
        email:
        {
            type: String,
            default: "",
            trim: true,
            required: "Email is required"
        },
        displayName:
        {
            type: String,
            default: "",
            trim: true,
            required: "Display Name is required"
        },
        created:
        {
            type: String,
            default: Date.now
        },
        updated:
        {
            type: String,
            default: Date.now
        },
    },
    {
        collection: "users"
    }
)

// configure options for user model

let options = ({ missingPasswordError: "Wrong / Missing Password"})

User.plugin(passportLocalMongoose, options)

module.exports.User = mongoose.model('User', User)