import React from 'react';
import OrderSidebar from '../client/src/OrderSidebar.jsx';

it('renders four subcomponents with appropriate data prop', () => {
  const sidebar = shallow(<OrderSidebar />);
  expect(sidebar).toMatchSnapshot();
});