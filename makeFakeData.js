const faker = require('faker');

const varTypes = ['Color', 'Flavor', 'Size', 'Style', 'Material', 'Scent'];
const whenMadeTypes = ['To order', 'Recently', '90s', '80s', '70s', '60s'];
const timeToShipTypes = ['1-3 days', '3-5 days', '1-2 weeks', '2-3 weeks'];
const shipOriginTypes = ['United States', 'United Kingdom', 'Canada'];

const randInt = highest => 1 + Math.floor(Math.random() * highest);
const randBool = () => !Math.round(Math.random());
const randEl = array => array[Math.floor(Math.random() * array.length)];
const randVariations = (len) => {
  const variations = [];
  while (variations.length < len) {
    // Variations are description-price tuples
    // Picks random price between 0.01-100.00
    variations.push([faker.random.word(), randInt(10000) / 100]);
  }
  return variations;
};
const randWordArray = (len) => {
  const words = [];
  while (words.length < len) {
    words.push(faker.random.word());
  }
  return words;
};

const makeFake = () => {
  const numVariationTypes = randInt(3);
  return {
    title: faker.commerce.productName(),
    sellerName: faker.random.word(),
    contactName: faker.name.firstName(),
    variationTypes: Array(numVariationTypes).fill(null).map(() => randEl(varTypes)),
    variations: Array(numVariationTypes).fill(null).map(() => randVariations(randInt(7))),
    quantity: randInt(25),
    materials: randWordArray(randInt(7)),
    isHandmade: randBool(),
    isProduct: randBool(),
    whenMade: randEl(whenMadeTypes),
    numReviews: randInt(500),
    numFavorites: randInt(500),
    acceptGiftCards: randBool(),
    timeToShip: randEl(timeToShipTypes),
    shipOrigin: randEl(shipOriginTypes),
    acceptReturn: randBool(),
    acceptExchange: randBool(),
    acceptCancel: randBool(),
  };
};

const fakes = Array(100).fill(null).map(() => makeFake());
module.exports = fakes;
