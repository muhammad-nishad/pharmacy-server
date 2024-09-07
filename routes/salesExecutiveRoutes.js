const express = require('express');
const router = express.Router();
const salesExecutiveController = require('../controllers/salesExecutiveController');



router.post('/signup', salesExecutiveController.signUp);

router.post('/login', salesExecutiveController.login);



module.exports = router;
