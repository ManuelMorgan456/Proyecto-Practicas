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



// .env 
PORT = 2000
// db_mongo="mongodb://localhost:27017"
// JWT_SECRET= "kpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0"
// JWT_EXPIRES = 1d

module.exports = router;
