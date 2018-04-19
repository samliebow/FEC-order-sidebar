import React from 'react';
import Shipping from '../client/src/Shipping.jsx';

describe('Shipping', () => {
  const testData = {
    timeToShip: '1-2 business days',
    shipOrigin: 'Valhalla',
    acceptReturn: true,
    acceptExchange: true,
    acceptCancel: false,
  };
  const wrapper = shallow(<Shipping data={testData} />);

  it('should toggle the destination select when toggleDestSelect called', () => {
    const shipping = wrapper.instance();
    let renderedHtml = render(shipping.render());
    expect(renderedHtml.find('input').length).toBe(0);
    shipping.toggleDestSelect();
    renderedHtml = render(shipping.render());
    expect(renderedHtml.find('input').length).toBe(1);
    shipping.toggleDestSelect();
    renderedHtml = render(shipping.render());
    expect(renderedHtml.find('input').length).toBe(0);
  });

  it('should render all country options', () => {
    const shipping = wrapper.instance();
    const numCountries = shipping.countries.length;
    shipping.toggleDestSelect();
    const destSelect = render(shipping.renderDestSelect());
    expect(destSelect.find('option').length).toBe(numCountries);
  });
});
