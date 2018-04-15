import React from 'react';
import ReactDOM from 'react-dom';
import OrderForm from './OrderForm.jsx';
import Overview from './Overview.jsx';
import Shipping from './Shipping.jsx';
import Favorite from './Favorite.jsx';
import Sharing from './Sharing.jsx';

const exampleData = {
  orderForm: {
    title: 'Star Trek - Captains Oath - Mission Oath - Quote Typography Art Poster Print - (Available in Many Sizes)',
    sellerName: 'HarknettPrints',
    contactName: 'Jamie [Harknett]',
    variationTypes: 'Size',
    variations: [['6x4 inches', 7.29], ['5x7 inches', 8.84], ['8x10 inches', 14.74]],
    quantity: 29,
    numInCarts: 4,
  },
  overview: {
    materials: ['Satin Photo Card', 'Photoshop'],
    isHandmade: true,
    isProduct: true,
    whenMade: 'Recently',
    numReviews: 1995,
    numFavorites: 2573,
    acceptGiftCards: true,
  },
  shipping: {
    timeToShip: '1-2 days',
    shipOrigin: 'United Kingdom',
    acceptReturn: true,
    acceptExchange: true,
    acceptCancel: false,
  },
};

class OrderSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="container">
        <OrderForm data={this.props.data.orderForm} />
        <Overview data={this.props.data.overview} />
        <Shipping data={this.props.data.shipping} />
        <Favorite />
        <Sharing />
      </div>);
  }
}

ReactDOM.render(<OrderSidebar data={exampleData} />, document.getElementById('order-sidebar'));
