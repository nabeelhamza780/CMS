const express = require('express')
const router = express.Router()
const path = require('path');
const formidable = require('formidable')
const fs = require('fs');
const Course = require('../database/models/course')
const User = require('../database/models/user')
const Registration = require('../database/models/courseregistration')
const Result = require('../database/models/result')
const File = require('../database/models/file')
const Solution = require('../database/models/solutions')
const Attendence = require('../database/models/attendence')
const Marks = require('../database/models/marks')
const Announcement = require('../database/models/announcement')

const passport = require('../passport')

let ts = Date.now();

let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();


router.post(
    '/signin',
    function (req, res, next) {
        console.log('routes/user.js, login, req.body: ');
        console.log(req.body)
        next()
    },
    passport.authenticate('local'),
    (req, res) => {

        console.log('logged in', req.message);
      user=req.user
        res.send(user);
    }
)

router.get('/', (req, res, next) => {
    console.log('===== user!!======')
    console.log(req.user)
    if (req.user) {
        res.send({ user: req.user })
    } 
    // else {
    //     res.send({ user:"no one here!" })
    // }
})
router.get('/allteachers', (req, res) => {
    
    User.find({type:'teacher'}, (err, result) => {
        console.log("message",result);
        res.send(result);
    })


})

router.get('/allstudents', (req, res) => {
    
    User.find({type:'user'}, (err, result) => {
        console.log("message",result);
        res.send(result);
    })


})

router.post('/students-by-semester', (req, res) => {
    
    User.find({type:'user',semester:req.body.semester}, (err, result) => {
        console.log("message",result);
        res.send(result);
    })


})


router.post('/logout', (req, res) => {
    console.log(req.user)
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})



router.get('/courses', (req, res) => {
   
    
    if (req.user) {
     Registration.find({regno:req.user.regno, status:'approved'}, (err, result) => {
        console.log(result);
        res.send(result);
        })
    }
    else {
        res.send({ msg: 'Please Login' })
    }

})
router.get('/result', (req, res) => {
   
    
    if (req.user) {
     Result.find({user:req.user.fullname}, (err, result) => {
        res.send(result);
        })
    }
    else {
        res.send({ msg: 'Please Login' })
    }

})

router.post('/quizAssignment', (req, res) => {
   console.log(req.body);
    
    if (req.user) {
     File.find({course:req.body.course, $or:[{type:'Assignment'},{type:'Quiz'}] }, (err, result) => {
         console.log(result);
        res.send(result);
        })
    }
    else {
        res.send({ msg: 'Please Login' })
    }

})
router.post('/content', (req, res) => {
     if (req.user) {
      File.find({course:req.body.course, type:'Other'}, (err, result) => {
          console.log(result);
         res.send(result);
         })
     }
     else {
         res.send({ msg: 'Please Login' })
     }
 
 })

router.post('/getmarks', (req, res) => {
     if (req.user) {
      Marks.find({course:req.body.course, user:req.user.fullname, }, (err, result) => {
          console.log(result);
         res.send(result);
         })
     }
     else {
         res.send({ msg: 'Please Login' })
     }
 
 })
 router.post('/getannouncements', (req, res) => {
     if (req.user) {
        Announcement.find({course:req.body.course }, (err, result) => {
          console.log(result);
         res.send(result);
         })
     }
     else {
         res.send({ msg: 'Please Login' })
     }
 
 })

 router.get('/coursesforreg', (req, res) => {
     console.log(date_ob);
    Course.find({regstatus:'opened'}, (err, result) => {
        res.send(result);
    })
})

router.post('/student-attendence', (req, res) => {
     
     if (req.user) {
        Attendence.find({ user:req.user.fullname, course:req.body.course } , (err, result) => {
            console.log(result);
         res.send(result);
         })
     }
     else {
         res.send({ msg: 'Please Login' })
     }
 
 })

 router.get('/courses-attendence', (req, res) => {
     
    if (req.user) {
       Attendence.find({ user:req.user.fullname } , (err, result) => {
           console.log(result);
        res.send(result);
        })
    }
    else {
        res.send({ msg: 'Please Login' })
    }

})



    router.post('/upload', (req, res) => {
  

    console.log('req received');
            const form = new formidable.IncomingForm();
            
            form.uploadDir = path.join(__dirname,'../../public/solutions');
    
            form.on('file',(field, file) => {
              fs.rename(file.path, path.join(form.uploadDir, file.name), (err) => {
              if(err) throw err;
              
            })
         
            return res.send('Done');
            
    })
         
        
        form.on('error', (err) => {
            return res.send('error');
            
          });
    
          form.on('end', () => {
            console.log("success");
    
          });
    
          form.parse(req);
        })

        router.post('/profileupload', (req, res) => {
  

            console.log('req received');
                    const form = new formidable.IncomingForm();
                    
                    form.uploadDir = path.join(__dirname,'../../public/profiles');
            
                    form.on('file',(field, file) => {
                      fs.rename(file.path, path.join(form.uploadDir, file.name), (err) => {
                      if(err) throw err;
                      
                    })
                 
                    return res.send('Done');
                    
            })
                 
                
                form.on('error', (err) => {
                    return res.send('error');
                    
                  });
            
                  form.on('end', () => {
                    console.log("success");
            
                  });
            
                  form.parse(req);
                })


        router.post('/addsolution', (req, res) => {
            console.log(req.body);
            if (req.user.type=='user') {
                const newFile = new Solution({
                    type:req.body.type,
                    file:req.body.file.file.name,
                    course:req.body.course,
                    user:req.user.fullname,
                    regno:req.user.regno,
                    studentname:req.user.fullname,
                    date:date_ob
                })
                newFile.save((err, savedRes) => {
                    if (err) return res.json(err)
                    res.send({ msg: 'Added Successfully' })
                })
            }
            else {
                res.send({ msg: 'Please Login' })
            }
        })

router.post('/register', (req, res) => {

    const { coursecode, coursename,courseCreditHours,instructor } = req.body
    console.log("instructor",instructor);
    if (req.user) {

        Registration.findOne({ user:req.user.username,coursecode:coursecode}, (err, user) => {
            if (err) {
                console.log('course register post error: ', err)
            } else if (user) {
                res.send({
                    msg: `Sorry, course ${coursecode} is already registerd by you`
                })
            }
            else {
                     
        const newCourse = new Registration({
        coursecode:coursecode,
        coursename:coursename,
        courseCreditHours:courseCreditHours,
        coursestatus:"Registered",
        user:req.user.fullname,
        regno:req.user.regno,
        semester:req.user.semester,
        instructor:instructor
    

        })
        newCourse.save((err, savedRes) => {
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

 router.post('/updateprofile', (req, res) => {
  
    if (req.user) {
        User.findOne({ username: req.user.username }, (err, user) => {
            if (err) {
                console.log('User.js post error: ', err)
            } else if (user) {
                console.log(user);
                User.update({ username: req.user.username },{$set:{email:req.body.email, contact:req.body.contact, address:req.body.address, picture:req.body.file.file.name, description:req.body.description }},
                function(error, results) {
                    if (error) {
                    return next(error);
                    }
                    user=req.user
                    res.send({ msg:"Profile Updated",user});
                    });
            }
        })
    }
    else {
        res.send({ msg: 'Please Login' })
    }

})



module.exports = router