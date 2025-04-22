const express = require('express');
const router = express.Router();
const scrapeFlipkart = require('../scrapers/flipkartScraper');
const scrapeAmazon = require('../scrapers/amazonScraper');
const SearchCache = require('../models/searchCache');

/**
 * @route   GET /api/compare
 * @desc    Compare prices from Flipkart and Amazon
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ 
        success: false, 
        message: 'Search query is required' 
      });
    }
    
    // Check if results are cached
    const cachedResults = await SearchCache.findOne({ query: query.toLowerCase() });
    
    if (cachedResults) {
      console.log(`Returning cached results for: ${query}`);
      return res.json({
        success: true,
        query,
        results: cachedResults.results,
        cached: true
      });
    }
    
    // If not cached, scrape both websites
    console.log(`No cache found for: ${query}, scraping websites...`);
    
    // Run scrapers in parallel
    const [flipkartResults, amazonResults] = await Promise.allSettled([
      scrapeFlipkart(query),
      scrapeAmazon(query)
    ]);
    
    // Combine results
    const results = [
      ...(flipkartResults.status === 'fulfilled' ? flipkartResults.value : []),
      ...(amazonResults.status === 'fulfilled' ? amazonResults.value : [])
    ];
    
    // Cache results if we have any
    if (results.length > 0) {
      await SearchCache.create({
        query: query.toLowerCase(),
        results
      });
      console.log(`Cached results for: ${query}`);
    }
    
    // Return results
    return res.json({
      success: true,
      query,
      results,
      cached: false
    });
    
  } catch (error) {
    console.error(`Error in compare route: ${error.message}`);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
});

module.exports = router;
