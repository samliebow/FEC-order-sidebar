import React from 'react';
import PropTypes from 'prop-types';

import OrderForm from './OrderForm';
import Overview from './Overview';
import Shipping from './Shipping';
import Favorite from './Favorite';

class OrderSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
    };
  }

  componentDidMount() {
    fetch(`http://127.0.0.1:1541${window.location.pathname}data`)
      .then(response => response.json())
      .then(data => this.setState({ data }))
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div id="container">
        <OrderForm data={this.state.data.orderForm} />
        <Overview data={this.state.data.overview} />
        <Shipping data={this.state.data.shipping} />
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
      variants: {
        dimensions: [
          {
            name: 'Color',
            options: ['Red', 'Blue', 'Yellow'],
          },
          {
            name: 'Size',
            options: ['Small', 'Medium', 'Big'],
          },
        ],

        allVariants: [
          ['Red', 'Small', 7.5, 5],
          ['Red', 'Medium', 7.6, 2],
          ['Red', 'Big', 7.7, 3],
          ['Blue', 'Small', 4.5, 6],
          ['Blue', 'Medium', 4.6, 1],
          ['Blue', 'Big', 4.7, 9],
          ['Yellow', 'Small', 9.5, 10],
          ['Yellow', 'Medium', 9.6, 12],
          ['Yellow', 'Big', 9.7, 13],
        ],
      },
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
      variants: PropTypes.shape({
        dimensions: PropTypes.arrayOf(PropTypes.object),
        allVariants: PropTypes.arrayOf(PropTypes.array),
      }),
      quantity: PropTypes.number,
      // numInCarts: PropTypes.number, // For special message
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

export default OrderSidebar;
