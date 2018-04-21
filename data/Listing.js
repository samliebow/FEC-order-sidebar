const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  listingNum: { type: String, unique: true, dropDups: true },
  listingName: { type: String, unique: true, dropDups: true },
  orderForm: {
    title: String,
    sellerName: String,
    contactName: String,
    variants: {
      dimensions: Array,
      allVariants: Array,
    },
    quantity: Number,
  },
  overview: {
    materials: Array,
    isHandmade: Boolean,
    isProduct: Boolean,
    whenMade: String,
    numReviews: Number,
    numFavorites: Number,
    acceptGiftCards: Boolean,
  },
  shipping: {
    timeToShip: String,
    shipOrigin: String,
    acceptReturn: Boolean,
    acceptExchange: Boolean,
    acceptCancel: Boolean,
  },
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
