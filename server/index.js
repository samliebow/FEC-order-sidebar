const express = require('express');
const path = require('path');

const app = express();

// matches listings/<any nine digits>/<any-letter-and-dash-sequence>/<not ending with 'data'>
app.use(/listings\/[0-9]{9}\/[A-z-]+\/(?!(data))/, express.static(path.join(__dirname, '../public')));

app.listen(541, () => console.log('Listening on port 541...'));
