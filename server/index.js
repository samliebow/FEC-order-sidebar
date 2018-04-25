const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const morgan = require('morgan');
const Listing = require('../data/Listing.js');

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));

// matches listings/<any nine digits>/<any-letter-and-dash-sequence>/<not ending with 'data'>
app.use(/listings\/[0-9]{9}\/[A-z-]+\/orderSidebar\/(?!.*data)/, express.static(path.join(__dirname, '../public')));
// matches any sequence which includes 'orderSidebar'
app.use('/orderSidebar', express.static(path.join(__dirname, '../public')));

app.get(
  '/listings/:listingNum/:listingName/orderSidebar/data',
  (req, res) => {
    const { listingNum, listingName } = req.params;
    Listing.findOne({ listingNum, listingName })
      .then((result) => {
        if (result) { // If no match, result is null
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.send(JSON.stringify(result));
        } else {
          res.status(404).send('No listing found');
        }
      });
  },
);

app.post(
  '/listings',
  (req, res) => Listing.create(req.body)
    .then(() => res.send('Listing saved'))
    .catch((error) => {
      console.error(error);
      res.status(500).send('Failed to save listing');
    }),
);

mongoose.connect('mongodb://localhost/etsy');
mongoose.connection.on('error', err => console.error(`Database connection error: ${err}`));
mongoose.connection.once('open', () => {
  console.log('Connection to database successful!');

  app.listen(1541, () => console.log('Listening on port 1541...'));
});
