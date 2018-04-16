const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Listing = require('../data/Listing.js');

const app = express();

// matches listings/<any nine digits>/<any-letter-and-dash-sequence>/<not ending with 'data'>
app.use(/listings\/[0-9]{9}\/[A-z-]+\/(?!(data))/, express.static(path.join(__dirname, '../public')));

app.get(
  'listings/:listingNum/:listingName/data',
  (req, res) => {
    const { listingNum, listingName } = req.params;
    Listing.findOne({ listingNum, listingName })
      .then(result => res.send(JSON.stringify(result)));
  },
);

mongoose.connect('mongodb://localhost/etsy');
mongoose.connection.on('error', err => console.error(`Database connection error: ${err}`));
mongoose.connection.once('open', () => {
  console.log('Connection to database successful!');

  app.listen(541, () => console.log('Listening on port 541...'));
});
