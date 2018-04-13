import React from 'react';
import ReactDOM from 'react-dom';

class OrderSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
}

ReactDOM.render(<OrderSidebar />, document.getElementById('order-sidebar'));

module.hot.accept(() => ReactDOM.render(<OrderSidebar />, document.getElementById('order-sidebar')));
