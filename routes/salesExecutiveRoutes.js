const express = require('express');
const router = express.Router();
const salesExecutiveController = require('../controllers/salesExecutiveController');



router.post('/signup', salesExecutiveController.signUp);

router.post('/login', salesExecutiveController.login);

router.get('/',salesExecutiveController.getSalesExecutive)

router.post('/add',salesExecutiveController.add)

router.get('/:id', salesExecutiveController.getById);

router.put('/:id', salesExecutiveController.updateById);

router.delete('/sales-executives/:id', salesExecutiveController.softDeleteById);





module.exports = router;
