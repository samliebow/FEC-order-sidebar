const mongoose = require('mongoose');
const fakeData = require('./makeFakeData.js');
const Listing = require('../data/Listing.js');

const seed = () => Listing.create(fakeData)
  .then(() => mongoose.disconnect())
  .catch(err => console.error(err));

mongoose.connect('mongodb://database/mini-market').then(seed)
  .catch(() => mongoose.connect('mongodb://127.0.0.1/mini-market')
    .then(seed)
    .catch(err => console.error(err)));
