var express = require('express');
var router = express.Router();
var userController = require("../controllers/userController");
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function (req, res, next) {
  const { firstName, lastName, email, password, gender } = req.body;
  userController.createUser(firstName, lastName, email, password, gender);
  res.json({
    firstName, lastName, email, gender
  });
});


module.exports = router;
