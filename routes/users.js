var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

router.post('/login', userController.login);
router.post('/register', userController.register);

module.exports = router;
