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
    const makeQuantityOptions = quantity =>
      Array(quantity).fill(null) // Array of nulls of length quantity
        .map((nada, index) => <option value={index}>{index}</option>);
    this.quantityOptions = makeQuantityOptions(this.props.data.quantity);
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
                {this.props.data.variations[type]
                  .map((variation) => {
                    const [description, price] = variation;
                    return (
                      <option value={`${variation}`}>
                        {`${description} ($${price})`}
                      </option>
                    );
                  })
                }
              </select>
            </div>
          ))}
        </div>
        <div id="quantity">
          <div>Quantity</div>
          <select>
            {this.quantityOptions}
          </select>
        </div>
      </div>);
  }
}

export default OrderForm;
