var express = require('express');
var router = express.Router();

const userController = require('../controllers/user.contoller');

router.post('/login', userController.login)

router.get('/', userController.getUser);

router.post('/', userController.addUser);

router.delete('/:id', userController.deleteUser);

router.get('/:id', userController.editUser);

router.put('/:id', userController.updataUser);


module.exports = router;

