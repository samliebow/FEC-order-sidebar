import React from 'react';

class OrderForm extends React.Component {
  constructor(props) {
    super(props);
    // const getLowestPrice = (variationType) => {
    //    **work on figuring out the default price shown later**
    // }
    this.state = {
      // price
    };
  }

  render() {
    return (
      <div className="mainItem" id="order-form">
        <h4>{this.props.data.title}</h4>
        <div id="price-and-question">
          <span id="price">$7.29+ [HC]</span>
          <span><button>Ask a question</button></span>
        </div>
        <div id="variations">
          {this.props.data.variationTypes.map(type => (
            <div className="variation">
              <div>{type}</div>
              <select>
                {this.props.data.variations[type].map(variation => (
                  <option value={`${variation}`}>{`${variation[0]} ($${variation[1]})`}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>);
  }
}

export default OrderForm;
