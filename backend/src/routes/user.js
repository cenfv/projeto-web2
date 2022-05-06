var express = require('express');
var router = express.Router();
var userController = require("../controllers/userController");
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/', async function (req, res, next) {
  const { firstName, lastName, email, password, gender } = req.body;
  try {
    user = await userController.createUser(firstName, lastName, email, password, gender);
    console.log(user)
    res.status(201).json({
      user
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "There was an error during user creation"
    })
  }


});


module.exports = router;
