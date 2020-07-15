const express = require('express');
const router = express.Router();
const controller = require('../Controller/controller');
const authLogin = require('../middlewares/authLogin.middleware');
router.get('/admin/users', controller.getAllUser);
router.post('/login',controller.Login);
router.post('/register', controller.Register);
module.exports = router;