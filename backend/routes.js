var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var config={ /* don't expose password or any sensitive info, done only for demo */
    host: "localhost",
    user: "root",
    password: "",
    database: "mvc_proje",
  }
var connection = mysql.createConnection(config)


router.post("/login", (req, res) => {
  // console.log("Login request "+JSON.stringify(req.body));
  // console.log({ incomingBody: req.body });
  connection.query(`SELECT * from users where username=${connection.escape(req.body.username)} and password=${connection.escape(req.body.password)}`, function (error, results, fields) {
    if (error) {
      res.status(503)
      res.json({"msg": error})
    } else {
      if (results.length==0) {
        res.status(404)
        res.json({ "msg": "User not found" })
      }
      else {        
        res.status(200)
        res.json(results[0])
      }
    }
  });
  
})
router.post("/register", (req, res) => {
  // console.log(req.body)
  // console.log("Register request "+JSON.stringify(req.body));
  connection.query(`SELECT * from users where username=${connection.escape(req.body.username)}`, function (error, results, fields) {
    if (error) {
      res.status(503)
      res.json({"msg": error})
    } else {
      if (results.length == 0) {
        connection.query(`insert into users (username,password,level,pending,name) values 
        (${connection.escape(req.body.username)}, ${connection.escape(req.body.password)}, ${connection.escape(req.body.level)},${connection.escape(req.body.pending)},${connection.escape(req.body.name)})`, function (error2, results, fields) {
          if (error2) {
            res.status(503)
            res.json({"msg": error})
          }
          else {
            res.status(200)
            res.json({ "msg":"Succesfully registered"})
            
          }
        })
        
      }
      else {        
        res.status(409)
        res.json({"msg":"User already exists"})
      }
    }
  });
})

router.post("/user/update", (req, res) => {
  var query=`update users set password=${connection.escape(req.body.newPassword)} where username=${connection.escape(req.body.username)} and password=${connection.escape(req.body.oldPassword)}`
  // console.log(query)
  connection.query(query, (error, results, fields) => {
    if (error) {
      res.status(503)
      res.json({msg:error})
    }
    else {
      res.status(200)
      res.json({msg:"Successfully updated password"})
    }
  })
})

router.post("/approval/teachers/select", (req, res) => {
  // console.log("Teacher approval list request")
  connection.query(`select * from users where pending=1`, function (error, results, fields) {
    if (error) {
      res.status(503)
      res.json({"msg": error})
    } else {        
      res.status(200)
      res.json(results)
      }
  })
})
router.post("/approval/teachers/update", (req, res) => {
  // console.log("Teacher pending update request "+JSON.stringify(req.body))
  connection.query(`update users set pending=${connection.escape(req.body.pending)} where id=${connection.escape(req.body.id)}`, function (error, results, fields) {
    if (error) {
      res.status(503)
      res.json({"msg": error})
    }
    else {
      connection.query(`select * from users where id=${connection.escape(req.body.id)}`, function (error2, results2, fields) {
        if (error2) {
          res.status(503)
          res.json({"msg": error2})
        }
        else {
          // console.log(results2)
          // console.log("Successfully "+((req.body.pending==0?"approved ":"denied ") + results2[0].name))
          res.status(200)
          res.json({msg:"Successfully "+((req.body.pending==0?"approved ":"denied ") + results2[0].name)})
        }
      })
      
    }
  })

})
router.post("/classes/stdClass/insert", (req, res) => {
  //sahip olunan sınıflar
  var query=`select classesStd.*,classes.* from classesStd 
  left join classes on classes.id=classesstd.classId
  where studentId = ${connection.escape(req.body.studentId)}`
  connection.query(query,function (error,results,fields) {
    if (error) {
      res.status(503)
      res.json({msg:error.sqlMessage})
    }
    else {
      //seçilen sınıf
      query = `select * from classes where id=${req.body.classId}`
      connection.query(query, (error2, results2, fields2) => {
        if (error2) {
          res.status(503)
          res.json({msg:error2.sqlMessage})
        }
        else {
          // console.log(results2)
          try {
            if (results2.length!=0) {
              //öğrencinin sahip olduğu sınıflar seçilen sınıfla gün ve saat olarak kesişiyor mu ona bakılıyor
              results.forEach(result => {
                if (result.day===results2[0].day && result.hour===results2[0].hour) {
                  // javascript doesn't support break in foreach 
                  //varsa error gönder
                  throw new Error("You have a class in that time and day")
                }
              });
            }
            //sıkıntı yoksa ekle
        query = `insert into classesStd (studentId,classId) values (${req.body.studentId},${req.body.classId})`
        connection.query(query, (error2, results2, fields2) => {
          if (error2) {
            res.status(503)
            res.json({msg:error2})
          }
          else {
            res.status(200)
            res.json({msg:"Successfully added class"})
          }
        })
      } catch (err) {
        res.status(409)
        res.json({msg:err.message})
      }
        }
      })

      
    }
  })
  
})
router.post("/classesStd/select", (req, res) => {
  var query = `select classesStd.*, users.name as 'stdName' from classesStd,users where users.id=classesStd.studentId and classId=${connection.escape(req.body.classId)} `

  connection.query(query, (error, results, fields) => {
    if (error) {
      res.status(503)
      res.json({msg:error})
    }
    else {
      res.status(200)
      res.json(results)
    }
  })
  // console.log(query)
})
router.post("/classes/approve/select", (req, res) => {
  // console.log(req.body)
  // öğretmenin onay verebileceği dersleri seç
  var query = `SELECT u1.name as "stdName",u1.id as "stdId", classes.name as "className", classes.day, classes.hour,classesstd.id as "classesstdId" from classesstd,users u1, users u2, classes where classesstd.studentId=u1.id and classesstd.classId=classes.id and 
  classes.teacherId=u2.id and classesstd.pending=1 and classes.teacherId=${connection.escape(req.body.id)}`
  
  connection.query(query, (error, results, fields) => {
    if (error) {
      res.status(503)
      res.json({msg:error})
    } else {
      res.status(200)
      res.json( results )
    }
  })
})

router.post("/classesStd/grade/update", (req, res) => {
  var query=`update classesstd set exam=${connection.escape(req.body.exam)}, final=${connection.escape(req.body.final)} where id = ${req.body.id}`
  connection.query(query, (error, results, fields) => {
    if (error) {
      res.status(503)
      res.json({msg:error})
    }
    else {
      res.status(200)
      res.json({msg:"Successful"})
    }
  })
})

router.post("/classes/approve/decision", (req, res) => {
  console.log(req.body)
  var query=``
  var msg=""
  if (req.body.decision===1) {
    query=`update classesstd set pending=0 where id=${connection.escape(req.body.id)}`
    msg="Successfully added class"
  }
  else {
    query = `delete from classesstd where id=${connection.escape(req.body.id)}`
    msg="Dropped class"
  }
  console.log(query)
  connection.query(query, (error, results, fields) => {
    if (error) {
      res.status(503)
      res.json({msg:error})
    }
    else {
      res.status(200)
      res.json({msg:msg})
    }
  })
})
router.post("/classes/stdClass/select", (req, res) => {
  //bütün sınıflar
  // console.log(req.body)
  var query = `select classes.*, users.name as "teacherName" from classes 
              left join users on classes.teacherId=users.id 
              where classes.pending = 0`
  connection.query(query, function (error, results, fields) {
    if (error) {
      res.status(503)
      res.json({msg:error})
    }
    else {
      var res_arr=[]
      //öğrencinin almış olduğu sınıflar
      query = `select * from classeSstd where studentId=${connection.escape(req.body.id)}`
      connection.query(query,function (error2,results2,fields2) {
        if (error2) {
          res.status(503)
          res.json({msg:error2})
        }
        else {
          //bütün sınıflardan öğrencinin almış olduğu sınıfları çıkart
          results.forEach(eachclass => {
            results2.forEach(eachselected => {
              if (eachclass.id===eachselected.classId) {
                res_arr.push(eachclass)
              }
            });
          });
          res_arr.forEach(element => {
            if (results.includes(element)) {
              results=results.filter(function(item) {
                          return item !== element
                        })
            }
          });

          //öğrencinin almamış olduğu sınıfları gönder
          res.status(200)
          res.json(results)
        }
      })
    }
  })
})

router.post("/classes/delete", (req, res) => {
  var query = `delete from classesstd where id=${connection.escape(req.body.id)}`
  console.log(query)
  connection.query(query, (error, results, fields) => {
    if (error) {
      res.status(503)
      res.json({msg:error})
    }
    else {
      res.status(200)
      res.json({msg:"Successfully dropped class"})
    }
  })
})

router.post("/classes/select", (req, res) => {
  // console.log(req.body)
  if (req.body.pending===1) {
    // console.log("Admin request for pending classes")
    connection.query(`SELECT classes.*, users.name as tname
FROM classes 
	LEFT JOIN users ON classes.teacherId = users.id where classes.pending=1`,function (error,results,fields) {
      if (error) {
        res.status(503)
        res.json({msg:error})
      } else {
        res.status(200)
        res.json(results)
      }
    })
  }else if (req.body.level===0) {
    // öğrenci calendar gönderilecek
    // var query = `select * from classesStd where studentId=${connection.escape(req.body.id)}`
    var query = `select c1.*, classesstd.*,users.name as "teacherName" from classes c1, classesstd, 
    users where classesstd.classId=c1.id and c1.teacherId=users.id and classesstd.studentId=${connection.escape(req.body.id)}`
    connection.query(query, function (error, results, fields) {
      if (error) {
        res.status(503)
        res.json({msg:error})
      }
      else {
        // console.log(results)
        res.status(200)
        res.json(results)
      }
    })
    
  }
  else {
    var query=`select * from classes where teacherId=${connection.escape(req.body.id)}`
    connection.query(query, function (error, results, fields) {
      if (error) {
        res.status(503)
        res.json({msg:error})
      }
      else {
        res.status(200)
        res.json(results)
      }
    })
  }
})


router.post("/classes/insert", (req, res) => {
  // console.log("Teacher id with " + req.body.teacherId + " wanted to add class: ")
  // console.log({className:req.body.className,hour: req.body.hour,day: req.body.day})
  connection.query(`select * from classes where 
  teacherId=${connection.escape(req.body.teacherId)} and 
  day=${connection.escape(req.body.day)} and
  hour=${connection.escape(req.body.hour)}`, function (error, results, fields) {
    if (error) {
      res.status(503)
      res.json({ msg: error })
    }
    else {
      if (results.length !== 0) {
        res.status(409)
        res.json({ msg: "That hour of the day is full" })
        
      }
      else {
        connection.query(`select * from classes where 
            teacherId=${connection.escape(req.body.teacherId)} and 
            name=${connection.escape(req.body.className)}`, function (error, results, fields) {
        if (error) {
          res.status(503)
          res.json({ msg: error })
        }
        else {
          if (results.length !== 0) {
            res.status(409)
            res.json({ msg: "Class already exists" })
            
          }
          else {
             connection.query(`insert into classes
    (name,teacherId,day,hour)
    values (
      ${connection.escape(req.body.className)},
      ${connection.escape(req.body.teacherId)},
      ${connection.escape(req.body.day)},
      ${connection.escape(req.body.hour)}
    )`, function (err2, res2, fields2) {
      if (err2) {
        res.status(503)
        res.json({ msg: err2.sqlMessage })
      }
      else {
        res.status(200)
        res.json({ msg: "Successfully added class" })
      }
    })
          }
        }
      })
      }
    }
  })
  }
)
router.post("/classes/update", (req, res) => {
  // console.log("Class pending update request " + JSON.stringify(req.body))
  if (req.body.pending===0) {
    

  connection.query(`update classes set pending=${connection.escape(req.body.pending)} where id=${connection.escape(req.body.id)}`, function (error, results, fields) {
    if (error) {
      res.status(503)
      res.json({"msg": error})
    }
    else {
          // console.log("Successfully "+((req.body.pending==0?"approved ":"denied ") + req.body.name))
          res.status(200)
          res.json({msg:"Successfully "+((req.body.pending==0?"approved ":"denied ") + req.body.name)})
        
      }
      
    })
  }
  else {
    connection.query(`delete from classes where id=${connection.escape(req.body.id)}`,function (error,results,fields) {
      if (error) {
        res.status(503)
        res.json({msg:error})
      } else {
        res.status(200)
        res.json({msg:"Successfully denied "+req.body.name})
      }
      
    })
  }

})

module.exports = router;
