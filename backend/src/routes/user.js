const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const checkToken = require('../middlewares/checkToken');
/* GET users listing. */
router.get('/:id',checkToken.checkTokenBearer, async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await userController.getUserById(id);
    res.status(200).json({
      user
    });
  }catch(err){
    console.log(err);
    res.status(500).json({
      msg: "User not found"
    })
  }
  
});

router.post('/', async function (req, res, next) {
  const { firstName, lastName, email, password, gender } = req.body;
  try {
    user = await userController.createUser(firstName, lastName, email, password, gender);
    console.log(user)
    res.status(201).json({
      firstName,lastName,email,gender
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "There was an error during user creation"
    })
  }


});


module.exports = router;
