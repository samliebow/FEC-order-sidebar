const mongoose = require('mongoose');
const fakeData = require('./makeFakeData.js');
const Listing = require('../data/Listing.js');

mongoose.connect('mongodb://database/etsy').then(() => {
  Listing.create(fakeData)
    .then(() => mongoose.disconnect())
    .catch(err => console.error(err));
});
