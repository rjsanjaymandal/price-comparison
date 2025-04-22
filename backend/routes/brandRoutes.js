const express = require('express');
const router = express.Router();
const Brand = require('../models/brand');

/**
 * @route   GET /api/brands
 * @desc    Get all brands
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const { category, popular } = req.query;
    
    let query = { isActive: true };
    
    // Filter by category if provided
    if (category) {
      query.categories = category;
    }
    
    // Filter by popularity if requested
    if (popular === 'true') {
      query.isPopular = true;
    }
    
    const brands = await Brand.find(query)
      .sort({ order: 1, name: 1 })
      .select('name slug description logo');
    
    res.json({
      success: true,
      count: brands.length,
      brands
    });
  } catch (error) {
    console.error(`Error in brands route: ${error.message}`);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
});

/**
 * @route   GET /api/brands/:slug
 * @desc    Get brand by slug
 * @access  Public
 */
router.get('/:slug', async (req, res) => {
  try {
    const brand = await Brand.findOne({ 
      slug: req.params.slug,
      isActive: true 
    }).populate('categories', 'name slug');
    
    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Brand not found'
      });
    }
    
    res.json({
      success: true,
      brand
    });
  } catch (error) {
    console.error(`Error in brand route: ${error.message}`);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
});

module.exports = router;
