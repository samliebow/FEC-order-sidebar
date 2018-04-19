import React from 'react';
import OrderForm from '../client/src/OrderForm.jsx';
import renderer from 'react-test-renderer';

const testData = {
  title: 'Widget',
  sellerName: 'fooBar Unlimited',
  contactName: 'Fred',
  variationTypes: ['Size'],
  variations: { Size: [['S', 10], ['M', 7], ['L', 11]] },
  quantity: 3,
};

describe('orderForm', () => {
  const wrapper = shallow(<OrderForm data={testData} />);
  const form = wrapper.instance();

  it('creates appropriate number of quantity select options', () => {
    expect(form.quantityOptions.length).toBe(3);
  });

  it('creates quantity select options with appropriate text and values', () => {
    expect(form.quantityOptions).toEqual([
      <option key={1} value={1}>{1}</option>,
      <option key={2} value={2}>{2}</option>,
      <option key={3} value={3}>{3}</option>,
    ]);
  });

  it('sets the initial single and total prices to the lowest variant price', () => {
    expect(form.state.singlePrice).toBe(7);
    expect(form.state.totalPrice).toBe(7);
  });
});
