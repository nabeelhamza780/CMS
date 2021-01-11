const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fileSchema = new Schema({

  
   type:{type: String,  default: ''},
   file:{type: String, default:'default.pdf'},
   course:{type: String,  default: ''},
   title:{type: String, default:''},
})



const File = mongoose.model('File', fileSchema)
module.exports = File