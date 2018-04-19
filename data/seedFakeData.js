const mongoose = require('mongoose');
const fakeData = require('./makeFakeData.js');
const Listing = require('../data/Listing.js');

mongoose.connect('mongodb://localhost/etsy').then(() => {
  Listing.create(fakeData)
    .then(results => console.log(results))
    .catch(err => console.error(err));
});
