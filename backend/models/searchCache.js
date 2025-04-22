const mongoose = require("mongoose");

// Define the schema for individual product results
const productSchema = new mongoose.Schema({
  store: {
    type: String,
    required: true,
    enum: [
      "Amazon",
      "Flipkart",
      "Croma",
      "Reliance Digital",
      "Snapdeal",
      "Tata Cliq",
    ],
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  originalPrice: {
    type: Number,
  },
  discount: {
    type: Number,
  },
  image: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  },
  reviewCount: {
    type: Number,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  deliveryInfo: {
    type: String,
  },
  offers: [
    {
      type: String,
    },
  ],
  specifications: {
    type: Map,
    of: String,
  },
});

// Define the schema for search results cache
const searchCacheSchema = new mongoose.Schema({
  query: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  category: {
    type: String,
  },
  brand: {
    type: String,
  },
  filters: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
  },
  results: [productSchema],
  totalResults: {
    type: Number,
    default: 0,
  },
  searchTime: {
    type: Number, // in milliseconds
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400, // TTL index: 24 hours (in seconds)
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const SearchCache = mongoose.model("SearchCache", searchCacheSchema);

module.exports = SearchCache;
