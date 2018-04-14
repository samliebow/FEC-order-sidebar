import React from 'react';
import ReactDOM from 'react-dom';

class OrderSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (<h1>Hello React</h1>);
  }
}

ReactDOM.render(<OrderSidebar />, document.getElementById('order-sidebar'));
