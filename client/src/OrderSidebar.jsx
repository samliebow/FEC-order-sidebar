import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

import OrderForm from './OrderForm';
import Overview from './Overview';
import Shipping from './Shipping';
import Favorite from './Favorite';
import styles from '../styles/OrderSidebar.css';

class OrderSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
    };
  }

  componentDidMount() {
    fetch(`${window.location.href}orderSidebar/data`)
      .then(response => response.json())
      .then(data => this.setState({ data }))
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div styleName="container">
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
            name: 'Frame material',
            options: ['Metal', 'Plastic', 'Wood'],
          },
          {
            name: 'Size',
            options: ['6x4 inches', '5x7 inches', '8x10 inches'],
          },
        ],

        allVariants: [
          ['Metal', '6x4 inches', 15, 5],
          ['Metal', '5x7 inches', 16.5, 2],
          ['Metal', '8x10 inches', 18, 3],
          ['Plastic', '6x4 inches', 10, 6],
          ['Plastic', '5x7 inches', 11, 1],
          ['Plastic', '8x10 inches', 12, 9],
          ['Wood', '6x4 inches', 17, 10],
          ['Wood', '5x7 inches', 19, 12],
          ['Wood', '8x10 inches', 20, 13],
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

window.OrderSidebar = CSSModules(OrderSidebar, styles);
export default CSSModules(OrderSidebar, styles);
