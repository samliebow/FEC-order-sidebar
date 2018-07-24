# Mini Market

An online marketplace listings page microservice. 
See live demo [here](http://ec2-54-241-187-193.us-west-1.compute.amazonaws.com/)!

Features:
- Dynamic price-range display which updates as user selects options
- Price and quantity displayed is always for lowest-priced matching item
- Prompts user for any missing information without form submission
- Automatically shown and hidden shipping destination select form

![Mini Market](https://github.com/samliebow/mini-market/raw/master/demo.gif)

## Usage

From within the repo directory, `npm install` and `npm scratchStart` the first time. This will seed the database with 100 records, which can be accessed from any of the URLs [here](https://github.com/samliebow/mini-market/raw/master/data/urls.txt).
After the first time, just run `npm start`!

## Requirements

If you want to install and run this locally, you must have a MongoDB instance running.

Node version: 8.11.3. An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).