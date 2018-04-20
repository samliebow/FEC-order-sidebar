import React from 'react';
import Overview from '../client/src/Overview.jsx';

const testData = {
  materials: ['flesh', 'blood'],
  isHandmade: true,
  isProduct: false,
  whenMade: '90s',
  numReviews: 100,
  numFavorites: 200,
  acceptGiftCards: true,
};

const testNotHandmade = Object.create(testData);
testNotHandmade.isHandmade = false;

describe('Overview', () => {
  it('should display "handmade" text if item is handmade', () => {
    const wrapper = shallow(<Overview data={testData} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should not display "handmade" text if item is not handmade', () => {
    const wrapper = shallow(<Overview data={testNotHandmade} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the review and favorite counts, as links', () => {
    const wrapper = shallow(<Overview data={testData} />);
    expect(wrapper.find('a').at(0).text()).toBe('100 reviews');
    expect(wrapper.find('a').at(1).text()).toBe('200 people');
  });

  it('should render the list of materials', () => {
    const wrapper = shallow(<Overview data={testData} />);
    expect(wrapper.find('.overview-list').at(1).text()).toBe('Materials: flesh, blood');
  });

  it('should render the vintage', () => {
    const wrapper = shallow(<Overview data={testData} />);
    expect(wrapper.find('.overview-list').at(2).text()).toBe('Vintage item from the \'90s');
  });
});

