const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');

router.post('/api/users/signin', userController.signIn);
router.post('/api/users/signup', userController.signUp);
router.post('/api/users/signout', userController.signOut);
router.get('/api/users/currentuser', userController.currentUser);

module.exports = router;