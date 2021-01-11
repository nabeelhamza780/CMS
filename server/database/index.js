//Connect to Mongo database
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

//your local database url
//27017 is the default mongoDB port
const uri = 'mongodb://admin:123qwe@cluster0-shard-00-00.gmqy6.mongodb.net:27017,cluster0-shard-00-01.gmqy6.mongodb.net:27017,cluster0-shard-00-02.gmqy6.mongodb.net:27017/Cluster0?ssl=true&replicaSet=atlas-p9ldg5-shard-0&authSource=admin&retryWrites=true&w=majority'

mongoose.connect(uri,{ useNewUrlParser: true ,useUnifiedTopology: true}).then(
    () => { 
       
        console.log('Connected to Mongo');
        
    },
    err => {
        
         console.log('error connecting to Mongo: ')
         console.log(err);
         
        }
  );


module.exports = mongoose.connection