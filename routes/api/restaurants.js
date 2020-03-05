const router = require('express').Router();
const restaurantCtrl = require('../../controllers/restaurants');
const isAuthenticated = require('../../config/auth');

router.post('/', isAuthenticated, restaurantCtrl.create);
router.get('/', isAuthenticated, restaurantCtrl.index);
router.get('/featured', restaurantCtrl.getFeatured);

module.exports = router;