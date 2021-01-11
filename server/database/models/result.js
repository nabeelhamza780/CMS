const mongoose = require('mongoose')
const Schema = mongoose.Schema

const resultSchema = new Schema({

   semester:{type: String,  default: ''},
   courses:[{
       course:{type: String,  default: ''},
       gpa:{type: String, default: '' },
   }],
   user:{type: String, default: '' },
   cgpa:{type: String,  default: ''},
})



const Result = mongoose.model('Result', resultSchema)
module.exports = Result