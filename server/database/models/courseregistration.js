const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.promise = Promise

// Define userSchema
const registrationSchema = new Schema({

    coursecode: {type: String},
    coursename:{type: String,  default: ''},
    courseDescription: {type: String,  default: ''},
    courseCreditHours: {type: String,  default: ''},
    coursePrerequisites: {type: String,  default: ''},
    coursetype: {type: String,  default: ''},
    coursestatus: {type: String,  default: ''},
    user:{type: String,default: ''},
    regno:{type:String,default:''},
    semester:{type:Number},
    status:{type: String,default:'pending'},
    program:{type:String,default: ''},
    instructor:{type:String,default: ''},
    attendence:{type:Number},

})



const Registration = mongoose.model('Registration', registrationSchema)
module.exports = Registration