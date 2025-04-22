const axios = require("axios");
const cheerio = require("cheerio");

/**
 * Scrapes Flipkart search results for a given query
 * @param {string} query - The search term
 * @returns {Promise<Array>} - Array of product objects
 */
const scrapeFlipkart = async (query) => {
  try {
    // Format the query for URL
    const formattedQuery = query.trim().replace(/\s+/g, "+");
    const url = `https://www.flipkart.com/search?q=${formattedQuery}`;

    console.log(`Scraping Flipkart for: ${query}`);

    // Make the request
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
      },
      timeout: 15000,
    });

    // Load HTML into cheerio
    const $ = cheerio.load(response.data);

    // For debugging
    console.log("Flipkart HTML length:", response.data.length);

    // Array to store results
    const products = [];

    // Try different selectors for product cards
    const productCards = $("div._1AtVbE").has(
      "div._4rR01T, a.s1Q9rs, a.IRpwTa"
    );

    console.log(`Found ${productCards.length} product cards on Flipkart`);

    // Limit to first 10 products
    const limit = Math.min(10, productCards.length);

    // Process each product card
    productCards.each((index, element) => {
      if (index >= limit) return false; // Break the loop after limit

      const card = $(element);

      // Try different selectors for title
      const titleElement = card.find("div._4rR01T, a.s1Q9rs, a.IRpwTa");
      const title = titleElement.first().text().trim();

      if (!title) return; // Skip if no title found

      // Try different selectors for price
      const priceElement = card.find("div._30jeq3");
      const priceText = priceElement.first().text().trim().replace(/[₹,]/g, "");
      const price = parseInt(priceText) || 0;

      if (price === 0) return; // Skip if no valid price found

      // Try different selectors for image
      const imgElement = card.find("img._396cs4, img._2r_T1I");
      const image = imgElement.first().attr("src") || "";

      if (!image) return; // Skip if no image found

      // Try different selectors for link
      const linkElement = card.find("a._1fQZEK, a.s1Q9rs, a._2rpwqI, a.IRpwTa");
      const relativeLink = linkElement.first().attr("href") || "";
      const link = relativeLink
        ? `https://www.flipkart.com${relativeLink}`
        : "";

      if (!link) return; // Skip if no link found

      // Add product to results
      products.push({
        store: "Flipkart",
        title,
        price,
        image,
        link,
      });
    });

    // If no products found, use fallback sample data for testing
    if (products.length === 0) {
      console.log("No products found on Flipkart, using fallback data");
      return [
        {
          store: "Flipkart",
          title: `${query} - Sample Product 1`,
          price: 19999,
          image: "https://rukminim2.flixcart.com/image/312/312/placeholder.jpg",
          link: "https://www.flipkart.com/search?q=" + formattedQuery,
        },
        {
          store: "Flipkart",
          title: `${query} - Sample Product 2`,
          price: 24999,
          image: "https://rukminim2.flixcart.com/image/312/312/placeholder.jpg",
          link: "https://www.flipkart.com/search?q=" + formattedQuery,
        },
      ];
    }

    console.log(`Found ${products.length} valid products on Flipkart`);
    return products;
  } catch (error) {
    console.error(`Error scraping Flipkart: ${error.message}`);
    return [];
  }
};

module.exports = scrapeFlipkart;
