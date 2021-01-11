const mongoose = require('mongoose')
const Schema = mongoose.Schema

const solutionSchema = new Schema({

  
   type:{type: String,  default: ''},
   file:{type: String, default:'default.pdf'},
   course:{type: String,  default: ''},
   user:{type:String,default:''},
   regno:{type:String},
   marks:{type:String,default:'Not Marked'},
   date:{type:String}
})



const Solution = mongoose.model('Solution', solutionSchema)
module.exports = Solution