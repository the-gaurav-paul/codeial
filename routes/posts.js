const exp = require('express');
const router = exp.Router();
const usersPosts = require('../controllers/users_posts');

router.get('/posts', usersPosts.posts);

module.exports = router;