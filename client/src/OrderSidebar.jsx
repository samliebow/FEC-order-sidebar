import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import OrderForm from './OrderForm.jsx';
import Overview from './Overview.jsx';
import Shipping from './Shipping.jsx';
import Favorite from './Favorite.jsx';

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
      </div>
    );
  }
}

OrderSidebar.defaultProps = {
  data: {
    orderForm: {
      title: 'Star Trek - Captains Oath - Mission Oath - Quote Typography Art Poster Print - (Available in Many Sizes)',
      sellerName: 'HarknettPrints',
      contactName: 'Jamie [Harknett]',
      variationTypes: ['Size'],
      variations: {
        Size: [['6x4 inches', 7.29], ['5x7 inches', 8.84], ['8x10 inches', 14.74]],
      },
      quantity: 29,
      numInCarts: 4,
    },
    overview: {
      materials: ['Satin Photo Card', 'Photoshop'],
      isHandmade: true,
      isProduct: true,
      whenMade: 'To order',
      numReviews: 1995,
      numFavorites: 2573,
      acceptGiftCards: true,
    },
    shipping: {
      timeToShip: '1-2 business days',
      shipOrigin: 'United Kingdom',
      acceptReturn: true,
      acceptExchange: true,
      acceptCancel: false,
    },
  },
};

OrderSidebar.propTypes = {
  data: PropTypes.shape({
    orderForm: PropTypes.shape({
      title: PropTypes.string.isRequired,
      sellerName: PropTypes.string.isRequired,
      contactName: PropTypes.string.isRequired,
      variationTypes: PropTypes.arrayOf(PropTypes.string),
      variations: PropTypes.objectOf(PropTypes.array),
      quantity: PropTypes.number,
      numInCarts: PropTypes.number,
    }).isRequired,
    overview: PropTypes.shape({
      materials: PropTypes.arrayOf(PropTypes.string),
      isHandmade: PropTypes.bool.isRequired,
      isProduct: PropTypes.bool.isRequired,
      whenMade: PropTypes.string.isRequired,
      numReviews: PropTypes.number.isRequired,
      numFavorites: PropTypes.number.isRequired,
      acceptGiftCards: PropTypes.bool.isRequired,
    }).isRequired,
    shipping: PropTypes.shape({
      timeToShip: PropTypes.string.isRequired,
      shipOrigin: PropTypes.string.isRequired,
      acceptReturn: PropTypes.bool.isRequired,
      acceptExchange: PropTypes.bool.isRequired,
      acceptCancel: PropTypes.bool.isRequired,
    }).isRequired,
  }),
};

ReactDOM.render(<OrderSidebar />, document.getElementById('order-sidebar'));

