const express = require('express')
const path = require('path');
const formidable = require('formidable')
const fs = require('fs');
const router = express.Router()
const File = require('../database/models/file')
const Solution = require('../database/models/solutions')
const Course = require('../database/models/course')
const Attendence = require('../database/models/attendence')
const Registration = require('../database/models/courseregistration')
const Marks = require('../database/models/marks')
const Announcement = require('../database/models/announcement')


router.post('/upload', (req, res) => {
  
        const form = new formidable.IncomingForm();
        form.uploadDir = path.join(__dirname,'../../public/files');

        form.on('file',(field, file) => {
          fs.rename(file.path, path.join(form.uploadDir, file.name), (err) => {
          if(err) throw err;
          
        })
     
        return res.send('Done');
        
})
        
    form.on('error', (err) => {
        console.log(error);
        return res.send('error');
        
        
      });

      form.on('end', () => {
        console.log("success");

      });

      form.parse(req);
    })

    router.post('/quizAssignmentsolutions', (req, res) => {
        console.log(req.body);
         if (req.user.type == 'teacher') {
            Solution.find({course:req.body.course}, (err, result) => {
              console.log(result);
             res.send(result);
             })
         }
         else {
             res.send({ msg: 'Please Login' })
         }
     
     })

     router.post('/add-announcement', (req, res) => {
        if (req.user) {
            Announcement.findOne({ title:req.body.title, instructor:req.user.fullname,course:req.body.course, }, (err, user) => {
                if (err) {
                    console.log('Announcement post error: ', err)
                } else if (user) {
                    res.send({
                        msg: `Sorry, You have Already Added Announcememnt against this Title ${req.body.title}`
                    })
                }
                else {
                    const newAnn = new Announcement({
                        course:req.body.course,
                        description:req.body.description,
                        title:req.body.title,
                        instructor:req.user.fullname
                    })
                    newAnn.save((err, savedRes) => {
                        if (err) return res.json(err)
                        res.send({ msg: 'Announcement added Successfully' })
                    })
                }
            })
    
        }
        else {
            res.send({ msg: 'Please Login with Valid Credentials' })
        }
    })
     


    router.post('/addfile', (req, res) => {
        console.log(req.body,"Add file");
        if (req.user.type=='teacher') {
            const newFile = new File({
                type:req.body.type,
                file:req.body.file.file.name,
                course:req.body.course,
                title:req.body.title
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


    router.get('/teachercourses', (req, res) => {

        if (req.user.type=='teacher') {
    
         Course.find({instructor:req.user.fullname}, (err, result) => {
            res.send(result);
            })
        }
        else {
            res.send({ msg: 'Please Login' })
        }
    
    })

    router.post('/studentsforAttendence', (req, res) => {
    
        Registration.find({instructor:req.user.fullname, coursename:req.body.coursename, status:'approved' }, (err, result) => {
            console.log(result);
            res.send(result);
        })
    
    
    })

    router.post('/markattendence', (req, res) => {

        if (req.user) {
            Attendence.findOne({ date: req.body.date, instructor:req.user.fullname,user:req.body.user, }, (err, user) => {
                if (err) {
                    console.log('attendence post error: ', err)
                } else if (user) {
                    res.send({
                        msg: `Sorry, You have Already Marked Today's Attendence for ${req.body.user}`
                    })
                }
                else {
                 const newAttendence = new Attendence({
                      
                        course:req.body.course,
                        date:req.body.date,
                        instructor:req.user.fullname,
                        user:req.body.user,
                        status:req.body.status,
                        lecture: req.body.lecture
                    
                
                })
                newAttendence.save((err, savedRes) => {
                    if (err) return res.json(err)
                    res.send({ msg: 'Attendence Marked' })
                })
                }
            })
    
        }
        else {
            res.send({ msg: 'Please Login with Valid Credentials' })
        }
    })




    router.post('/addmarks', (req, res) => {
        console.log(req.body);
              if (req.user) {
                  req.body.forEach(data => {
                      console.log(data);
                  Marks.findOne({ date: data.date, instructor:req.user.fullname,type:data.type, details:data.details,user:data.user }, (err, user) => {
                      if (err) {
                          console.log('attendence post error:', err)
                      } else if (user) {
                        Marks.update({ user: data.user },
                            {$set:
                                {
                                date:data.date,
                                instructor:req.user.fullname,
                                type:data.type,
                                details:data.details,
                                user:data.user,
                                obtainedmarks:data.obtainedmarks,
                                totalmarks:data.totalmarks,
                                course:data.course
                            }},
                            function(error, results) {
                                if (error) {
                                return next(error);
                                }
                              
                                res.send({ msg:"Marks Updated"});
                                });
                      }
                      else {
                       const newMarks = new Marks({
                            
                        date:data.date,
                        instructor:req.user.fullname,
                        type:data.type,
                        details:data.details,
                        user:data.user,
                        obtainedmarks:data.obtainedmarks,
                        totalmarks:data.totalmarks,
                        course:data.course,
                      })
                      newMarks.save((err, savedRes) => {
                          if (err) return res.json(err)
                          res.send({ msg: 'Marks Added' })
                      })
                      }
                  })
                })
              }
              else {
                  res.send({ msg: 'Please Login with Valid Credentials' })
              }
          })

          router.post('/showattendence', (req, res) => {
            if (req.user) {
                Attendence.find({  instructor:req.user.fullname,course:req.body.course,date:req.body.date, }, (err, user) => {
                    if (err) {
                        console.log('attendence view error: ', err)
                    } else if (user) {
                        res.send(user)
                    }
                })
        
            }
            else {
                res.send({ msg: 'Please Login with Valid Credentials' })
            }
        })
       

        router.post('/showmarks', (req, res) => {

            if (req.user) {
                Marks.find({  instructor:req.user.fullname,date:req.body.date,type:req.body.type,course:req.body.course}, (err, user) => {
                    if (err) {
                        console.log('attendence view error: ', err)
                    } else if (user) {
                        res.send(user)
                    }
                })
        
            }
            else {
                res.send({ msg: 'Please Login with Valid Credentials' })
            }
        })
    
    
    
module.exports = router