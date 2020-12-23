const adminController = require('../controllers/admin.js');
const router = require('express').Router();

router.post('/register', adminController.register);

module.exports = router;
