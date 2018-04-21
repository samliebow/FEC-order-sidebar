const faker = require('faker');
const listingIds = require('./ids.json');

const varTypes = ['Color', 'Flavor', 'Size', 'Style', 'Material', 'Scent'];
const whenMadeTypes = ['To order', 'Recently', '90s', '80s', '70s', '60s'];
const timeToShipTypes = ['1-3 days', '3-5 days', '1-2 weeks', '2-3 weeks'];
const shipOriginTypes = ['United States', 'United Kingdom', 'Canada'];

const randInt = highest => 1 + Math.floor(Math.random() * highest);
const randBool = () => !Math.round(Math.random());
const randEl = array => array[Math.floor(Math.random() * array.length)];

const makeVariants = () => {
  const variantDimensions = Array(Math.floor(Math.random() * 3)).fill(null)
    .map(() => {
      const options = [];
      for (let i = 0; i < (randInt(5) + 1); i++) {
        options.push(faker.random.word());
      }
      return {
        name: randEl(varTypes),
        options,
      };
    });
  if (!variantDimensions.length) {
    // Listings with no variants are represented by a variants object
    // where there's no dimensions and only one 'variant'.
    return { dimensions: [], allVariants: [null, null, randInt(10000) / 100, randInt(50)] };
  }

  if (variantDimensions.length === 1) {
    const allVariants = variantDimensions[0].options
      .map(option => [option, null, randInt(10000) / 100, randInt(50)]);
    return { dimensions: variantDimensions, allVariants };
  }

  const allVariants = [];
  variantDimensions[0].options
    .forEach(option => allVariants.push(...variantDimensions[1].options
      .map(secondDimensionOption => (
        [option, secondDimensionOption, randInt(10000) / 100, randInt(50)]))));
  return { dimensions: variantDimensions, allVariants };
};

const makeRandWordArray = (len) => {
  const words = [];
  while (words.length < len) {
    words.push(faker.random.word());
  }
  return words;
};

const makeFake = (listingNum, listingName) => ({
  listingNum, // Shorthand for listingNum = listingNum, per linter preference
  listingName,
  orderForm: {
    title: faker.commerce.productName(),
    sellerName: faker.random.word(),
    contactName: faker.name.firstName(),
    variants: makeVariants(),
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
});

const fakes = listingIds.map(({ listingNum, listingName }) => makeFake(listingNum, listingName));
module.exports = fakes;
