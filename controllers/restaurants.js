const Restaurant = require('../models/restaurant');

async function create(req, res) {
    try {
      const restaurant = await Restaurant.create(req.body);
      res.json({restaurant});
    } catch (error) {
      res.json(401).json({err: 'unauthorized'})
    }
  }

async function index(req, res) {
  try {
    const restaurants = await Restaurant.find({}).sort('-createdAt').populate('addedBy');
    res.json({ restaurants });
  } catch (error) {
    res.status(401).json({err: 'unauthorized'})
  }
}

async function getFeatured(req, res) {
  try {
    const featuredRestaurants = await Restaurant.find({}).sort('-createdAt').limit(3).populate('addedBy');
    res.json({ featuredRestaurants });
  } catch (error) {
    res.status(400).json({err: 'bad request'});
  }
}

module.exports = {
    create,
    index,
    getFeatured
}