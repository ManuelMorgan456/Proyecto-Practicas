const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')
const middleware = require('../middleware/jwt')

// ---------Rutas registro y login-----------
router.post('/register',userController.register);
router.post('/login',userController.login);

// Rutas protegidas con middleware
router.get('/users',middleware.verifyToken,userController.getUsers);
router.delete('/deleteUser/:id',middleware.verifyToken,userController.deleteUser);
router.put('/update/:id',middleware.verifyToken,userController.updateUser);


module.exports = router;
