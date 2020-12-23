const passport = require('passport');
const userController = require('../controllers/user.js');
const router = require('express').Router();
const auth_user = passport.authenticate('jwt-user', { session: false });

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/me', auth_user, userController.getMe);
router.get('/data', userController.getAllUsers);

module.exports = router;
