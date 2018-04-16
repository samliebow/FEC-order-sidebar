const faker = require('faker');
const listingIds = require('./ids.json');

const varTypes = ['Color', 'Flavor', 'Size', 'Style', 'Material', 'Scent'];
const whenMadeTypes = ['To order', 'Recently', '90s', '80s', '70s', '60s'];
const timeToShipTypes = ['1-3 days', '3-5 days', '1-2 weeks', '2-3 weeks'];
const shipOriginTypes = ['United States', 'United Kingdom', 'Canada'];

const randInt = highest => 1 + Math.floor(Math.random() * highest);
const randBool = () => !Math.round(Math.random());
const randEl = array => array[Math.floor(Math.random() * array.length)];
const makeRandVariations = (variationTypes) => {
  const makeVariationOptions = (num) => {
    const options = [];
    while (options.length < num) {
      // Options are description-price tuples
      // Picks random price between 0.01-100.00
      options.push([faker.random.word(), randInt(10000) / 100]);
    }
    return options;
  };
  const variations = {};
  variationTypes.forEach((type) => {
    variations[type] = makeVariationOptions(randInt(7));
  });
  return variations;
};

const makeRandWordArray = (len) => {
  const words = [];
  while (words.length < len) {
    words.push(faker.random.word());
  }
  return words;
};

const makeFake = (listingNum, listingName) => {
  // I have to put these above the return so that 'variations' can reference them
  const numVariationTypes = randInt(1); // Just selecting one variation type for now
  // But this setup handles any number of them
  const variationTypes = Array(numVariationTypes).fill(null).map(() => randEl(varTypes));
  return {
    listingNum, // Shorthand for listingNum = listingNum, per linter preference
    listingName,
    orderForm: {
      title: faker.commerce.productName(),
      sellerName: faker.random.word(),
      contactName: faker.name.firstName(),
      variationTypes,
      variations: makeRandVariations(variationTypes),
      quantity: randInt(25),
    },
    overview: {
      materials: makeRandWordArray(randInt(7)),
      isHandmade: randBool(),
      isProduct: randBool(),
      whenMade: randEl(whenMadeTypes),
      numReviews: randInt(500),
      numFavorites: randInt(500),
      acceptGiftCards: randBool(),
    },
    shipping: {
      timeToShip: randEl(timeToShipTypes),
      shipOrigin: randEl(shipOriginTypes),
      acceptReturn: randBool(),
      acceptExchange: randBool(),
      acceptCancel: randBool(),
    },
  };
};

const fakes = listingIds.map(({ listingNum, listingName }) => makeFake(listingNum, listingName));
module.exports = fakes;
