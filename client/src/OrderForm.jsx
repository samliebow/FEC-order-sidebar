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

  renderSpecialMessage() {
    const specialMessage = 'others want'; // Hard-coding for now
    if (specialMessage === 'others want') {
      return (
        <div>
          <span>((Image will go here)) </span>
          {/* The real thing is vector graphics in a <g> tag,
          will have to figure out how to replicate. */}
          <span><b>Other people want this.</b> 4 people have this in their carts right now.</span>
        </div>
      );
    } else {
      return <br />;
    }
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

        <div id="buy-now">
          <button>
          Buy it now {'>'}
          </button>
        </div>

        <div id="add-cart">
          <button>
          Add to cart
          </button>
        </div>

        {this.renderSpecialMessage()}

      </div>
    );
  }
}

export default OrderForm;
