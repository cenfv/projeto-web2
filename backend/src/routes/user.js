const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const checkToken = require('../middlewares/checkToken');


router.get('/:id', checkToken.checkTokenBearer, async (req, res, next) => {
  const targetId = req.params.id;
  try {
    const user = await userController.getUserById(targetId);
    res.status(200).json({
      user
    });
  } catch (err) {
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
      firstName, lastName, email, gender
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "There was an error during user creation"
    })
  }

});

router.put('/:id', checkToken.checkTokenBearer, async (req, res, next) => {
  const targetId = req.params.id;
  if (targetId != req.id) {
    res.status(404).json({
      msg: "User not authenticated"
    })
  }
  try {
    const { firstName, lastName, email, password, gender } = req.body;
    const user = await userController.updateUser(req.id,firstName, lastName, email, password, gender);
    res.status(200).json({
      user
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "User not found"
    })
  }

});


module.exports = router;
