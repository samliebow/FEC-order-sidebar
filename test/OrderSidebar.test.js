import React from 'react';
import OrderSidebar from '../client/src/OrderSidebar.jsx';

test('render four subcomponents with appropriate data prop', () => {
  const sidebar = shallow(<OrderSidebar />);
  expect(sidebar).toMatchSnapshot();
});