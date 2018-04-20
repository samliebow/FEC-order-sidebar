import React from 'react';
import OrderForm from '../client/src/OrderForm.jsx';

const testData = {
  title: 'Widget',
  sellerName: 'fooBar Unlimited',
  contactName: 'Fred',
  variants: {
    dimensions: [
      {
        name: 'Color',
        options: ['Black', 'Green', 'White'],
      },
      {
        name: 'Size',
        options: ['S', 'M', 'L'],
      },
    ],

    allVariants: [
      ['Black', 'S', 7.5],
      ['Black', 'M', 7.6],
      ['Black', 'L', 7.7],
      ['Green', 'S', 4.5],
      ['Green', 'M', 4.6],
      ['Green', 'L', 4.7],
      ['White', 'S', 9.5],
      ['White', 'M', 9.6],
      ['White', 'L', 9.7],
    ],
  },
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

  it('creates the correct number of variant options', () => {
    expect(wrapper.find('.variant-option').length).toBe(8);
  });

  it('creates variants with appropriate text and values', () => {
    expect(wrapper.find('.variant-option').last().html()).toBe('<option class="variant-option" value="L">L ($4.70-9.70)</option>');
  });

  it('sets the initial single and total prices to the lowest variant price', () => {
    expect(form.state.singlePrice).toBe(4.5);
    expect(form.state.totalPrice).toBe('4.50');
  });

  it('multiplies the single unit price by the quantity selected', () => {
    form.handleQuantitySelect({ target: { value: 5 } });
    expect(form.state.totalPrice).toBe('22.50');
  });

  it('sets pleaseSelectShown to true if handleBuyNowClick called before variation selected', () => {
    expect(form.state.pleaseSelectShown).toBe(false);
    form.handleBuyNowClick();
    expect(form.state.pleaseSelectShown).toBe(true);
  });


});
