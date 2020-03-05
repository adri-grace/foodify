const router = require('express').Router();
const restaurantCtrl = require('../../controllers/restaurants');

router.get('/featured', restaurantCtrl.getFeatured);

router.use(require('../../config/auth'));

router.post('/', isAuthenticated, restaurantCtrl.create);
router.get('/', isAuthenticated, restaurantCtrl.index);

function isAuthenticated(req,res, next) {
    if (req.user) return next();
    return res.status(401).json({msg: 'not authorized'});
}


module.exports = router;