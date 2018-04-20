import React from 'react';
import OrderForm from '../client/src/OrderForm.jsx';

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
  let form;
  beforeEach(() => {
    form = wrapper.instance();
  });

  it('creates quantity select options with appropriate text and values', () => {
    expect(form.quantityOptions).toEqual([
      <option className="quantity" key={1} value={1}>{1}</option>,
      <option className="quantity" key={2} value={2}>{2}</option>,
      <option className="quantity" key={3} value={3}>{3}</option>,
    ]);
  });

  it('creates the correct number of variation options', () => {
    expect(wrapper.find('.variation').length).toBe(3);
  });

  it('creates variations with appropriate text and values', () => {
    expect(wrapper.find('.variation').last().html()).toBe('<option class="variation" value="L,11">L ($11)</option>');
  });

  it('sets the initial single and total prices to the lowest variant price', () => {
    expect(form.state.singlePrice).toBe(7);
    expect(form.state.totalPrice).toBe(7);
  });

  it('multiplies the single unit price by the quantity selected', () => {
    form.handleQuantitySelect({ target: { value: 5 } });
    expect(form.state.totalPrice).toBe(35);
  });

  it('sets pleaseSelectShown to true if handleBuyNowClick called before variation selected', () => {
    expect(form.state.pleaseSelectShown).toBe(false);
    form.handleBuyNowClick();
    expect(form.state.pleaseSelectShown).toBe(true);
  });


});
