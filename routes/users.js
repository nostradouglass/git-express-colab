var express = require('express');
var router = express.Router();
const User = require('../models/User')

/* GET users listing. */
router.get('/', function (req, res, next) {

  console.log("first route was hit");

  User.
    find()
    .lean()
    .exec((err, data) => {
      if (err) {
        res.send(err)
      } else {
        res.json(data)
      }
    })
});


router.post('/', (req, res) => {
  console.log(req.body)
  let user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  })

  user.save((err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.json(data)
    }
  })
})

router.delete('/:userId', (req, res) => {
  User
    .where('id').equals(req.params.id)
    .remove()
    .exec((err, data) => {
      if (err) {
        res.send(err)
      } else {
        res.json(data)
      }
    })
})

router.get('/:userId', (req, res) => {
  User
    .where('id').equals(req.params.id)
    .exec((err, data) => {
      if (err) {
        res.send(err)
      } else {
        res.json(data[0])
      }
    })

  router.get('/findUserByFirstName/:firstName'), (req, res) => {
    console.log("find has been reached")
    User
    .where('firstName').equals(req.params.firstName)
    .exec((err, data) => {
      if(err) {
        res.send(err)
      }
      else {
        console.log(data);
        res.json(data)
      }
    })
  }

})

module.exports = router;
