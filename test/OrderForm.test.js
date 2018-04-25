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
      ['Black', 'S', 7.5, 3],
      ['Black', 'M', 7.6, 2],
      ['Black', 'L', 7.7, 5],
      ['Green', 'S', 4.5, 2],
      ['Green', 'M', 4.6, 1],
      ['Green', 'L', 4.7, 9],
      ['White', 'S', 9.5, 11],
      ['White', 'M', 9.6, 4],
      ['White', 'L', 9.7, 8],
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
    expect(wrapper.find('.quantity').last().html()).toBe('<option class="quantity" value="2">2</option>');
  });

  it('creates the correct number of variant options', () => {
    expect(wrapper.find('.variantOption').length).toBe(8);
  });

  it('creates variants with appropriate text and values', () => {
    expect(wrapper.find('.variantOption').last().html()).toBe('<option value="L" class="variantOption">L ($4.70-9.70)</option>');
  });

  it('sets the initial single and total prices to the lowest variant price', () => {
    expect(form.state.singlePrice).toBe(4.5);
    expect(form.state.totalPrice).toBe('4.50+');
  });

  it('multiplies the single unit price by the quantity selected', () => {
    form.handleQuantitySelect({ target: { value: 5 } });
    expect(form.state.totalPrice).toBe('22.50');
  });

  it('sets the pleaseSelectShown states to true if handleBuyNowClick called before variation selected', () => {
    expect(form.state.pleaseSelectShownZero).toBe(false);
    expect(form.state.pleaseSelectShownOne).toBe(false);
    form.handleBuyNowClick();
    expect(form.state.pleaseSelectShownZero).toBe(true);
    expect(form.state.pleaseSelectShownOne).toBe(true);
  });


});
