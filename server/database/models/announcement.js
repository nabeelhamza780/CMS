const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs');
mongoose.promise = Promise

// Define userSchema
const announcementSchema = new Schema({


    course:{type: String,  default: ''},
    description: {type: String,  default: ''},
    title: {type: String,  default: ''},
    instructor:{type:String,default: ''},
    
})

// Define schema methods


// Define hooks for pre-saving


const Announcement = mongoose.model('Announcement', announcementSchema)
module.exports = Announcement