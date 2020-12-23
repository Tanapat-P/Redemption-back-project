const passport = require('passport');
const pointController = require('../controllers/point.js');
const router = require('express').Router();

const auth_user = passport.authenticate('jwt-user', { session: false });
const auth_admin = passport.authenticate('jwt-admin', { session: false });

router.post('/', auth_user, pointController.redeem);
router.post('/add', auth_admin, pointController.addPoint);

module.exports = router;
