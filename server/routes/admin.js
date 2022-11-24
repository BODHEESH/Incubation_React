const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const adminLogin = require("../models/admin/adminLogin");
const slotsBooking = require("../models/user/slots");
const applicationForm = require("../models/user/application");
const slots = require("../models/user/slots");
var jwt = require("jsonwebtoken");

// const admin = {
//   myEmail: "admin@gmail.com",
//   myPassword: "qwerty",
// };

// router.post('/adminRegister', async (req, res)=>{
//     try{
       
//         const securePassword = await bcrypt.hash(req.body.password, 12);
        
//             const registerUser = new adminLogin({
//                 email: req.body.email,
//                 password: securePassword,
//             })

//           const user =  await registerUser.save();
//            res.json({user})
//     }catch(error){
//         console.log(error);
//     }

   
// })

router.post('/slotRegister',async (req, res)=> {
      console.log(req.body.sloatNo);
      console.log(req.body.status);
      console.log(req.body.bookedId);
  try {
    const slotReg = new slotsBooking({
      sloatNo: req.body.sloatNo,
      status: req.body.status,
      bookedId: req.body.bookedId,
    })
    const slot = await slotReg.save();
    res.json({slot})
  } catch (error) {
    console.log(error);
  }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        console.log(req.body.email,req.body.password);

        adminLogin.findOne({ email: email }).then(response => {
            console.log(response ,"response-------------------------");
            var mailStatus = true;
            var passwordStatus = true;
            if (!response) {
                mailStatus = false;
                return res.status(200).json({ auth: false, mailStatus });
            }
            else mailStatus = true;
            bcrypt.compare(password, response.password).then(result => {
                if (!result) {
                    passwordStatus = false;
                    return res.status(200).json({ auth: false, passwordStatus })
                } else {
                    passwordStatus = true;
                    let resp = {
                        id: response._id,
                    }

                    let adminToken = jwt.sign(resp, process.env.JWT_ADMIN_SECRET, { expiresIn: 300 });
                    res.status(200).json({ auth: true, adminToken: adminToken, passwordStatus })

                }
            })
        }).catch(error => {
            res.json(error)
        })
    } catch (error) {
        console.log(error);
    }
})

router.get("/home", async (req, res) => {
  try {
    applicationForm
      .find({ status: "pending" })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        res.json(error);
      });
  } catch (error) {
    console.log(error);  
  }
});

router.post("/approve/:id", async (req, res) => {
  console.log(req.params.id ,"____________________________________________");
  try {
    applicationForm
      .findByIdAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            status: "approved",
          },
        }
      )
      .then((response) => {
        if (response) res.status(200).json({ update: true });
      })
      .catch((error) => {
        res.json(error);
      });
  } catch (error) {
    console.log(error);
  }
});

router.post("/reject/:id", async (req, res) => {
  try {
    applicationForm
      .findByIdAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            status: "rejected",
          },
        }
      )
      .then((response) => {
        if (response) res.status(200).json({ update: true });
      })
      .catch((error) => {
        res.json(error);
      });
  } catch (error) {
    console.log(error);
  }
});

router.get("/approved", async (req, res) => {
  try {
    applicationForm
      .find({ status: "approved" })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        res.json(error);
      });
  } catch (error) {
    console.log(error);
  }
});

router.get("/rejected", async (req, res) => {
  try {
    applicationForm
      .find({ status: "rejected" })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        res.json(error);
      });
  } catch (error) {
    console.log(error);
  }
});

router.get("/booking_slots", async (req, res) => {
  try {
    slots
      .find()
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        res.json(error);
      });
  } catch (error) {
    console.log(error);
  }
});

router.get("/slotBooking", async (req, res) => {
  try {
    applicationForm
      .findOneAndUpdate(
        { _id: req.query.companyId },
        {
          $set: {
            status: "Booked",
          },
        }
      )
      .then((response) => {
        if (response) {
          slots
            .findOneAndUpdate(
              { sloatNo: req.query.slotId },
              {
                $set: {
                  bookedId: req.query.companyId,
                  status: true,
                },
              }
            )
            .then((response) => {
              res.status(200).json(response);
            })
            .catch((error) => res.json(error));
        }
      })
      .catch((error) => res.json(error));
  } catch (error) {
    console.log(error);
  }
});

router.get("/progress", async (req, res) => {
  try {
    applicationForm
      .find()
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        res.json(error);
      });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
