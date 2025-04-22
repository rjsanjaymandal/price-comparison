const express = require('express');
const router = express.Router();
const Product = require('../models/product');

/**
 * @route   GET /api/products
 * @desc    Get products with filtering, sorting, and pagination
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const { 
      category, 
      subcategory, 
      brand, 
      minPrice, 
      maxPrice, 
      sort, 
      page = 1, 
      limit = 20 
    } = req.query;
    
    // Build query
    let query = {};
    
    // Filter by category
    if (category) {
      query.category = category;
    }
    
    // Filter by subcategory
    if (subcategory) {
      query.subcategory = subcategory;
    }
    
    // Filter by brand
    if (brand) {
      query.brand = brand;
    }
    
    // Filter by price range
    if (minPrice || maxPrice) {
      query.lowestPrice = {};
      if (minPrice) query.lowestPrice.$gte = Number(minPrice);
      if (maxPrice) query.lowestPrice.$lte = Number(maxPrice);
    }
    
    // Determine sort order
    let sortOption = { popularity: -1 }; // Default sort by popularity
    
    if (sort) {
      switch (sort) {
        case 'price_asc':
          sortOption = { lowestPrice: 1 };
          break;
        case 'price_desc':
          sortOption = { lowestPrice: -1 };
          break;
        case 'newest':
          sortOption = { createdAt: -1 };
          break;
        case 'rating':
          sortOption = { averageRating: -1 };
          break;
        default:
          sortOption = { popularity: -1 };
      }
    }
    
    // Calculate pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    
    // Execute query with pagination
    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum)
      .select('name slug brand category images lowestPrice highestPrice averageRating reviewCount');
    
    // Get total count for pagination
    const totalProducts = await Product.countDocuments(query);
    
    res.json({
      success: true,
      count: products.length,
      totalPages: Math.ceil(totalProducts / limitNum),
      currentPage: pageNum,
      products
    });
  } catch (error) {
    console.error(`Error in products route: ${error.message}`);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
});

/**
 * @route   GET /api/products/popular
 * @desc    Get popular products
 * @access  Public
 */
router.get('/popular', async (req, res) => {
  try {
    const { limit = 10, category } = req.query;
    
    let query = {};
    if (category) {
      query.category = category;
    }
    
    const products = await Product.find(query)
      .sort({ popularity: -1 })
      .limit(parseInt(limit))
      .select('name slug brand category images lowestPrice highestPrice averageRating reviewCount');
    
    res.json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    console.error(`Error in popular products route: ${error.message}`);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
});

/**
 * @route   GET /api/products/new
 * @desc    Get new products
 * @access  Public
 */
router.get('/new', async (req, res) => {
  try {
    const { limit = 10, category } = req.query;
    
    let query = { isNew: true };
    if (category) {
      query.category = category;
    }
    
    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .select('name slug brand category images lowestPrice highestPrice averageRating reviewCount');
    
    res.json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    console.error(`Error in new products route: ${error.message}`);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
});

/**
 * @route   GET /api/products/:slug
 * @desc    Get product by slug
 * @access  Public
 */
router.get('/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    // Get similar products
    const similarProducts = await Product.find({
      _id: { $ne: product._id },
      $or: [
        { category: product.category },
        { brand: product.brand }
      ]
    })
      .sort({ popularity: -1 })
      .limit(6)
      .select('name slug brand category images lowestPrice highestPrice averageRating reviewCount');
    
    res.json({
      success: true,
      product,
      similarProducts
    });
  } catch (error) {
    console.error(`Error in product route: ${error.message}`);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
});

/**
 * @route   GET /api/products/search/:query
 * @desc    Search products
 * @access  Public
 */
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const { page = 1, limit = 20 } = req.query;
    
    // Calculate pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    
    // Search using text index
    const products = await Product.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .skip(skip)
      .limit(limitNum)
      .select('name slug brand category images lowestPrice highestPrice averageRating reviewCount');
    
    // Get total count for pagination
    const totalProducts = await Product.countDocuments({ $text: { $search: query } });
    
    res.json({
      success: true,
      count: products.length,
      totalPages: Math.ceil(totalProducts / limitNum),
      currentPage: pageNum,
      products
    });
  } catch (error) {
    console.error(`Error in product search route: ${error.message}`);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
});

module.exports = router;
