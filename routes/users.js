const exp = require('express');
const router = exp.Router();
const usersController = require('../controllers/users_controller');

router.get('/profile', usersController.profile);

module.exports = router;