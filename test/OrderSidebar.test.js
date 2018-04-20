import React from 'react';
import OrderSidebar from '../client/src/OrderSidebar.jsx';

describe('orderSidebar', () => {
  const fakeData = {
    orderForm: {
      title: 'Widget',
      sellerName: 'fooBar Unlimited',
      contactName: 'Fred',
      variationTypes: ['Size'],
      variations: { Size: [['S', 10], ['M', 7], ['L', 11]] },
      quantity: 3,
    },
    overview: {
      materials: ['flesh', 'blood'],
      isHandmade: true,
      isProduct: false,
      whenMade: '90s',
      numReviews: 100,
      numFavorites: 200,
      acceptGiftCards: true,
    },
    shipping: {
      timeToShip: '1-2 business days',
      shipOrigin: 'Valhalla',
      acceptReturn: true,
      acceptExchange: true,
      acceptCancel: false,
    },
  };
  global.fetch = jest.fn(() => new Promise(resolve => resolve({ json: () => fakeData })));

  const wrapper = shallow(<OrderSidebar />);

  it('renders four subcomponents with appropriate data prop', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('updates state with result of fetch', () => {
    const sidebar = wrapper.instance();
    expect(sidebar.state.data).toEqual(fakeData);
  });
});
