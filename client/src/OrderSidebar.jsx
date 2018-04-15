import React from 'react';
import ReactDOM from 'react-dom';
import OrderForm from './OrderForm.jsx';
import Overview from './Overview.jsx';
import Shipping from './Shipping.jsx';
import Favorite from './Favorite.jsx';
import Sharing from './Sharing.jsx';

class OrderSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (<div id="container"><OrderForm /><Overview /><Shipping /><Favorite /><Sharing /></div>);
  }
}

ReactDOM.render(<OrderSidebar />, document.getElementById('order-sidebar'));
