const router = require('express').Router();
const restaurantCtrl = require('../../controllers/restaurants');

router.post('/', restaurantCtrl.create);
router.get('/', restaurantCtrl.index);
router.get('/featured', restaurantCtrl.getFeatured);

module.exports = router;