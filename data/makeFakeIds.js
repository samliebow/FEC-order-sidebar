const faker = require('faker');
const fs = require('fs');

const ids = [];
for (let i = 0; i < 100; i += 1) {
  const id = {};
  id.listingNum = `${Math.round(Math.random() * 1000000000)}`.padStart(9, '0');
  id.listingName = `${faker.commerce.productAdjective()}-${faker.commerce.productMaterial()}-${faker.commerce.product()}-${faker.commerce.color().replace(' ','-')}`.toLowerCase();
  ids.push(id);
}

fs.writeFile('ids.json', JSON.stringify(ids));
