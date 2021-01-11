const mongoose = require('mongoose')
const Schema = mongoose.Schema

const attendenceSchema = new Schema({

   user:{type: String,  default: ''},
   course:{type: String,  default: ''},
   date:{type: String,default: '' },
   instructor:{type: String,default: '' },
   status:{type: String,default: '' },
   lecture:{type: String, default: ''}
})



const Attendence = mongoose.model('Attendence', attendenceSchema)
module.exports = Attendence