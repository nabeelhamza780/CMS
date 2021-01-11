const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs');
mongoose.promise = Promise

// Define userSchema
const courseSchema = new Schema({

    coursecode: {type: String},
    coursename:{type: String,  default: ''},
    courseDescription: {type: String,  default: ''},
    courseCreditHours: {type: String,  default: ''},
    coursePrerequisites: {type: String,  default: ''},
    coursetype: {type: String,  default: ''},
    program:{type:String,default: ''},
    instructor:{type:String,default: ''},
    totallectures:{type: Number},
    regstatus:{type:String,default: 'opened'}

})

// Define schema methods


// Define hooks for pre-saving


const Course = mongoose.model('Course', courseSchema)
module.exports = Course