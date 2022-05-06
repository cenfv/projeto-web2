var express = require('express');
var router = express.Router();
var userController = require("../controllers/userController");
var jwt = require("jsonwebtoken");

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
  });
  

router.post('/', async function(req, res, next) {
    console.log( "teste" );
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