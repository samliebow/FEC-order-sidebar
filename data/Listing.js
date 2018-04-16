const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  listingNum: String,
  listingName: String,
  orderForm: {
    title: String,
    sellerName: String,
    contactName: String,
    variationTypes: Array,
    variations: Object,
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
