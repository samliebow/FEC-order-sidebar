const ids = require('./ids.json');
const fs = require('fs');

const urls = ids.map(({ listingNum, listingName }) => `http://127.0.0.1:541/listings/${listingNum}/${listingName}/`).join('\n');
fs.writeFile('urls.txt', urls);
