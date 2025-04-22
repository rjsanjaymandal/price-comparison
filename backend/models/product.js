const mongoose = require('mongoose');

// Define the schema for product specifications
const specificationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
});

// Define the schema for price history
const priceHistorySchema = new mongoose.Schema({
  store: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  available: {
    type: Boolean,
    default: true
  },
  url: {
    type: String,
    required: true
  }
});

// Define the schema for product reviews
const reviewSchema = new mongoose.Schema({
  user: {
    type: String,
    default: 'Anonymous'
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Define the main product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  description: {
    type: String
  },
  brand: {
    type: String,
    required: true,
    index: true
  },
  category: {
    type: String,
    required: true,
    index: true
  },
  subcategory: {
    type: String,
    index: true
  },
  images: [{
    type: String
  }],
  specifications: [specificationSchema],
  priceHistory: [priceHistorySchema],
  currentPrices: [{
    store: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    available: {
      type: Boolean,
      default: true
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  }],
  lowestPrice: {
    type: Number
  },
  highestPrice: {
    type: Number
  },
  averageRating: {
    type: Number,
    default: 0
  },
  reviews: [reviewSchema],
  reviewCount: {
    type: Number,
    default: 0
  },
  popularity: {
    type: Number,
    default: 0
  },
  isNew: {
    type: Boolean,
    default: true
  },
  releaseDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create indexes for better search performance
productSchema.index({ name: 'text', brand: 'text', category: 'text', description: 'text' });

// Update timestamps on save
productSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Calculate lowest and highest prices before saving
productSchema.pre('save', function(next) {
  if (this.currentPrices && this.currentPrices.length > 0) {
    const prices = this.currentPrices.map(p => p.price);
    this.lowestPrice = Math.min(...prices);
    this.highestPrice = Math.max(...prices);
  }
  next();
});

// Calculate average rating before saving
productSchema.pre('save', function(next) {
  if (this.reviews && this.reviews.length > 0) {
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    this.averageRating = totalRating / this.reviews.length;
    this.reviewCount = this.reviews.length;
  }
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
