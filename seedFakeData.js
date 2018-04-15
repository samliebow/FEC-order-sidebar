const mongoose = require('mongoose');
const fakeData = require('./makeFakeData.js');

mongoose.connect('mongodb://localhost/etsy');

const listingSchema = new mongoose.Schema({
  listingNum: String, // It has leading 0s
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
Listing.create(fakeData, (err, results) => {
  if (err) {
    console.error(err);
  } else {
    console.log(results);
  }
});
