const express = require('express');

const router= express.Router();

const {UserRegister, loginUser}= require('../controller/UserAuthController');

router.route('/register').post(UserRegister)
router.route('/login').post(loginUser)

module.exports = router
