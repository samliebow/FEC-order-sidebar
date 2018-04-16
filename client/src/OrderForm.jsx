import React from 'react';
import PropTypes from 'prop-types';

class OrderForm extends React.Component {
  constructor(props) {
    super(props);
    // This currently only handles one price-determining variation
    // To do: see later if/how Etsy allows multiple of those
    const getLowestPrice = (variationType) => {
      const prices = this.props.data.variations[variationType]
        .map(tuple => tuple[1]);
      return Math.min(...prices);
    };
    const lowestPrice = getLowestPrice(this.props.data.variationTypes[0]);
    this.state = {
      singlePrice: lowestPrice,
      totalPrice: lowestPrice,
      quantity: 1,
      variation: '',
    };
    const makeQuantityOptions = quantity =>
      Array(quantity + 1).fill(null) // Array of nulls of length quantity
        .map((nada, index) => <option key={index} value={index}>{index}</option>);
    this.quantityOptions = makeQuantityOptions(this.props.data.quantity).slice(1);
    this.handleVariationSelect = this.handleVariationSelect.bind(this);
    this.handleQuantitySelect = this.handleQuantitySelect.bind(this);
  }

  handleVariationSelect(event) {
    const [description, price] = event.target.value.split(',');
    this.setState({
      singlePrice: price,
      variation: description,
    });
  }

  handleQuantitySelect(event) {
    const quantity = +event.target.value;
    this.setState({
      quantity,
      totalPrice: this.state.singlePrice * quantity,
    });
  }

  // Going to think about implementing this as a stretch goal

  // renderSpecialMessage() {
  //   const specialMessage = 'others want'; // Hard-coding for now
  //   if (specialMessage === 'others want') {
  //     return (
  //       <div>
  //         <span>((Image will go here)) </span>
  //         { /* The real thing is vector graphics in a <g> tag,
  //         will have to figure out how to replicate. */ }
  //         <span>
  //           <b>Other people want this. </b>
  //           {this.props.data.numInCarts} people have this in their carts right now.
  //         </span>
  //       </div>
  //     );
  //   }
  //   return null;
  // }


  render() {
    return (
      <div className="mainItem" id="order-form">
        <h4>{this.props.data.title}</h4>

        <div id="price-and-question">
          <span id="price">${this.state.totalPrice}</span>
          <span><button>Ask a question</button></span>
        </div>

        <div id="variations">
          {this.props.data.variationTypes.map(type => (
            <div key={type} className="variation">
              <div>{type}</div>

              <select onChange={this.handleVariationSelect}>
                {this.props.data.variations[type]
                  .map((variation) => {
                    const [description, price] = variation;
                    return (
                      <option key={description} value={variation}>
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
          <select onChange={this.handleQuantitySelect}>
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

        {/* this.renderSpecialMessage() */}

      </div>
    );
  }
}

OrderForm.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    sellerName: PropTypes.string.isRequired,
    contactName: PropTypes.string.isRequired,
    variationTypes: PropTypes.arrayOf(PropTypes.string),
    variations: PropTypes.objectOf(PropTypes.array),
    quantity: PropTypes.number,
    // numInCarts: PropTypes.number,
  }).isRequired,
};

export default OrderForm;
