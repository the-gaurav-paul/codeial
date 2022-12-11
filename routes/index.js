const exp = require('express');
const router = exp.Router();
const homeController = require('../controllers/home_controller');

//console.log('router loaded');
router.get('/', homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
module.exports = router;