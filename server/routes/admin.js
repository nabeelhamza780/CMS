const express = require('express')
const router = express.Router()
const User = require('../database/models/user')
const Admin = require('../database/models/admin')
const Registration = require('../database/models/courseregistration')
const Course = require('../database/models/course')
const Result = require('../database/models/result')

const passport = require('../passport')

router.post('/adduser', (req, res) => {
    const { username, password,fullname,email,type,contact,address,regno,semester } = req.body
    // ADD VALIDATION
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
        } else if (user) {
            res.send({
                msg: `Sorry, already a user with the username: ${username}`
            })
        }
        else {
            const newUser = new User({
                username: username,
                password: password,
                fullname:fullname,
                email:email,
                type:type,
                contact:contact,
                address:address,
                regno:regno,
                semester:semester

            })
            newUser.save((err, savedUser) => {
                if (err) return res.send({ msg: 'Something Went Wrong ' })
                res.send({ msg: 'Added Successfully' })
            })
        }
    })
})

router.get('/allusers', (req, res) => {
    console.log(req.user.username);
    User.find({}, (err, result) => {
       res.send(result);
       })
})

router.post('/deleteuser', (req, res) => {

    if (req.user.type=="admin"){
        User.findOneAndDelete({username:req.body.username},function(error, results) {
            if (error) {
            return next(error);
            }
            res.send({msg:`${req.body.fullname} Deleted`});
            });
    }
    else{
        res.send("Please Login with valid Credentials"); 
    }
})


router.post('/togglereg', (req, res) => {
    Course.updateMany({},{regstatus:req.body.status}, (err, result) => {
        res.send({ msg: `Regestrations ${req.body.status}` })
       })
})




router.get('/regrequests', (req, res) => {
     console.log(req.user.username);
     Registration.find({}, (err, result) => {
        res.send(result);
        })
})



router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})



router.get('/courses', (req, res) => {
    Course.find({}, (err, result) => {
        res.send(result);
    })
})

router.post('/getresultofstudent', (req, res) => {
    console.log(req.body);
    Result.find({user:req.body.user}, (err, result) => {
        console.log('stdent',result);
        res.send(result);
    })


})

router.post('/addcourse', (req, res) => {
  
    if (req.user) {
        Course.findOne({ coursecode: req.body.courseno }, (err, user) => {
            if (err) {
                console.log('add course post error: ', err)
            } else if (user) {
                res.send({
                    msg: `Sorry, already a course with the  ${req.body.courseno} already Exists`
                })
            }
            else {
                const { courseno, courseDescription,courseCreditHours,coursePrerequisites,coursetype,coursestatus,coursename } = req.body
                const newCourse = new Course({
                    coursecode:courseno,
                    coursename:coursename,
                    courseDescription:courseDescription,
                    courseCreditHours:courseCreditHours,
                    coursePrerequisites:coursePrerequisites,
                    coursetype:coursetype,
                    coursestatus:coursestatus,
               
                
            
            })
            newCourse.save((err, savedRes) => {
                if (err) return res.json(err)
                res.send({ msg: 'Added Successfully' })
            })
            }
        })

    }
    else {
        res.send({ msg: 'Please Login with Valid Credentials' })
    }





})

router.post('/addresult', (req, res) => {
  
    if (req.user) {
        Result.findOne({ user: req.body.user }, (err, user) => {
            if (err) {
                console.log('User.js post error: ', err)
            } else if (user) {
                console.log(user);
               Result.update({ user: req.body.user },{$set:{semester:req.body.semester,cgpa:req.body.cgpa,courses:req.body.courses}},
                function(error, results) {
                    if (error) {
                    return next(error);
                    }
                  
                    res.send({ msg:"Result Updated"});
                    });
            }
            else {
                const newResult = new Result({
                    user:req.body.user,
                    semester:req.body.semester,
                    cgpa:req.body.cgpa,
                    courses:req.body.courses
                  })
                  newResult.save((err, savedRes) => {
                  if (err) return res.json(err)
                  res.send({ msg: 'Added Successfully' })
                      })
            }
        })
    }
    else {
        res.send({ msg: 'Please Login' })
    }

})

router.post('/deletecourse', (req, res) => {

    if (req.user.type=="admin"){
          Course.findOneAndDelete({coursecode:req.body.coursecode},function(error, results) {
            if (error) {
            return next(error);
            }
         
            res.send({msg:"Deleted"});
            });
    }
    else{
        res.send("Please Login with valid Credentials"); 
    }
})

router.post('/assignteacher', (req, res) => {
 
     console.log(req.body);
     if (req.user.type=="admin"){
         
           Course.findOneAndUpdate({coursename:req.body.course},{instructor:req.body.teacher},function(error, results) {
             if (error) {
             return next(error);
             }
          
             res.send({msg:"Assigned"});
             });
     }
     else{
         res.send("Please Login with valid Credentials"); 
     }
   
 
 
 })

router.post('/approveresponse', (req, res) => {
   console.log(req.user.type);
   
    if (req.user.type=="admin"){
        Registration.findOneAndUpdate({coursecode:req.body.no, regno:req.body.regno},{status:"approved"},function(error, results) {
            if (error) {
            return next(error);
            }
            console.log("result of discard",results);
            res.send("Approved");
            });
    }
    else{
        res.send("Please Login with valid Credentials"); 
    }
  


})

router.post('/discardresponse', (req, res) => {
   console.log(req.body);
    if (req.user.type=="admin"){
        Registration.findOneAndUpdate({coursecode:req.body.no, regno:req.body.regno},{status:"rejected"},function(error, results) {
        if (error) {
        return next(error);
        }
      console.log("result of discard",results);
        res.send("Discarded");
        });
    }
    else{
        res.send("Please Login with valid Credentials"); 
    }

})



module.exports = router