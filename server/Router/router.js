const express = require('express');
const router = express.Router();
const controller = require('../Controller/controller');

router.get('/', controller.getAllUser);
// router.get('/register-api', controller.Register);

module.exports = router;