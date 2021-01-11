const mongoose = require('mongoose')
const Schema = mongoose.Schema

const marksSchema = new Schema({

   user:{type: String,  default: ''},
   course:{type: String,  default: ''},
   date:{type: String,default: '' },
   instructor:{type: String,default: '' },
   type:{type: String,default: '' },
   details:{type: String, default: ''},
   totalmarks:{type: Number},
   obtainedmarks:{type: Number},
})



const Marks = mongoose.model('Marks', marksSchema)
module.exports = Marks