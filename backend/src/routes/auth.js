const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const jwt = require("jsonwebtoken");

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
  });
  

router.post('/', async function(req, res, next) {
    const { email, password } = req.body;

    try {
        const user = await userController.userAuth(email, password);
        console.log(user);
        const secret = process.env.SECRET;
        const token = jwt.sign({
            id: user.id
        }, secret)
        res.status(200).json({
            msg: "user authenticated successfully",
            token: token
        })
    } catch (err) {
        console.log(err);
        res.status(404).json({
            msg: "User not authenticated"
        })
    }
});

module.exports = router;