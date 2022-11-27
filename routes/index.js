const exp = require('express');
const router = exp.Router();
const homeController = require('../controllers/home_controller');

//console.log('router loaded');
router.get('/', homeController.home);

module.exports = router;