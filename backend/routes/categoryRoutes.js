const express = require('express');
const router = express.Router();
const Category = require('../models/category');

/**
 * @route   GET /api/categories
 * @desc    Get all categories
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true })
      .sort({ order: 1, name: 1 })
      .select('name slug description image level parent');
    
    res.json({
      success: true,
      count: categories.length,
      categories
    });
  } catch (error) {
    console.error(`Error in categories route: ${error.message}`);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
});

/**
 * @route   GET /api/categories/:slug
 * @desc    Get category by slug
 * @access  Public
 */
router.get('/:slug', async (req, res) => {
  try {
    const category = await Category.findOne({ 
      slug: req.params.slug,
      isActive: true 
    });
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }
    
    // Get subcategories if this is a parent category
    const subcategories = await Category.find({ 
      parent: category._id,
      isActive: true 
    }).sort({ order: 1, name: 1 });
    
    res.json({
      success: true,
      category,
      subcategories
    });
  } catch (error) {
    console.error(`Error in category route: ${error.message}`);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
});

/**
 * @route   GET /api/categories/parent/:id
 * @desc    Get subcategories by parent ID
 * @access  Public
 */
router.get('/parent/:id', async (req, res) => {
  try {
    const subcategories = await Category.find({ 
      parent: req.params.id,
      isActive: true 
    }).sort({ order: 1, name: 1 });
    
    res.json({
      success: true,
      count: subcategories.length,
      subcategories
    });
  } catch (error) {
    console.error(`Error in subcategories route: ${error.message}`);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
});

module.exports = router;
