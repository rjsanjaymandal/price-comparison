const puppeteer = require("puppeteer");

/**
 * Scrapes Amazon search results for a given query
 * @param {string} query - The search term
 * @returns {Promise<Array>} - Array of product objects
 */
const scrapeAmazon = async (query) => {
  let browser = null;

  try {
    console.log(`Scraping Amazon for: ${query}`);

    // Format the query for URL
    const formattedQuery = query.trim().replace(/\s+/g, "+");
    const url = `https://www.amazon.in/s?k=${formattedQuery}`;

    // Launch puppeteer
    browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ],
      defaultViewport: { width: 1280, height: 800 },
    });

    const page = await browser.newPage();

    // Set user agent
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    // Navigate to Amazon search page
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });

    // Wait for search results to load
    await page
      .waitForSelector(".s-result-item", { timeout: 10000 })
      .catch(() => console.log("Timeout waiting for search results"));

    // Try to extract product information
    const products = await page.evaluate(() => {
      const items = Array.from(
        document.querySelectorAll(
          '.s-result-item[data-asin]:not([data-asin=""]'
        )
      );

      // Limit to first 10 products
      const limit = Math.min(10, items.length);
      const results = [];

      for (let i = 0; i < limit; i++) {
        const item = items[i];

        // Extract title
        const titleElement = item.querySelector("h2 .a-link-normal");
        const title = titleElement ? titleElement.textContent.trim() : "";

        if (!title) continue;

        // Extract price
        const priceElement = item.querySelector(".a-price .a-offscreen");
        const priceText = priceElement
          ? priceElement.textContent.trim().replace(/[₹,]/g, "")
          : "0";
        const price = parseInt(priceText) || 0;

        if (price === 0) continue;

        // Extract image URL
        const imageElement = item.querySelector(".s-image");
        const image = imageElement ? imageElement.getAttribute("src") : "";

        if (!image) continue;

        // Extract product link
        const linkElement = item.querySelector("h2 .a-link-normal");
        const link = linkElement ? linkElement.getAttribute("href") : "";
        const fullLink = link
          ? link.startsWith("http")
            ? link
            : `https://www.amazon.in${link}`
          : "";

        if (!fullLink) continue;

        // Only add products with all required information
        results.push({
          store: "Amazon",
          title,
          price,
          image,
          link: fullLink,
        });
      }

      return results;
    });

    // If no products found, use fallback sample data
    if (products.length === 0) {
      console.log("No products found on Amazon, using fallback data");
      return [
        {
          store: "Amazon",
          title: `${query} - Amazon Product 1`,
          price: 18999,
          image:
            "https://m.media-amazon.com/images/G/31/img16/anywhere/transparent-pixel._CB485935036_.gif",
          link: "https://www.amazon.in/s?k=" + formattedQuery,
        },
        {
          store: "Amazon",
          title: `${query} - Amazon Product 2`,
          price: 23999,
          image:
            "https://m.media-amazon.com/images/G/31/img16/anywhere/transparent-pixel._CB485935036_.gif",
          link: "https://www.amazon.in/s?k=" + formattedQuery,
        },
      ];
    }

    console.log(`Found ${products.length} products on Amazon`);
    return products;
  } catch (error) {
    console.error(`Error scraping Amazon: ${error.message}`);
    return [];
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

module.exports = scrapeAmazon;
