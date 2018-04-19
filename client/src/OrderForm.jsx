import React from 'react';
import PropTypes from 'prop-types';

class OrderForm extends React.Component {
  constructor(props) {
    super(props);
    const lowestPrice = this.getLowestPrice(this.props.data.variationTypes[0]);
    // slice to convert from 0-based to 1-based numbering
    this.quantityOptions = this.makeQuantityOptions().slice(1);

    this.state = {
      singlePrice: lowestPrice,
      // toFixed solves floating point issue; it returns a string, but that's not a problem here.
      totalPrice: lowestPrice.toFixed(2),
      quantity: 1,
      variation: '',
      pleaseSelectShown: false, // e.g. "Please select a size"
    };

    this.handleVariationSelect = this.handleVariationSelect.bind(this);
    this.handleQuantitySelect = this.handleQuantitySelect.bind(this);
    this.handleBuyNowClick = this.handleBuyNowClick.bind(this);
  }

  getLowestPrice(variationType) {
    const prices = this.props.data.variations[variationType]
      .map(descriptionPriceTuple => descriptionPriceTuple[1]);
    return Math.min(...prices);
  }

  makeQuantityOptions() {
    return Array(this.props.data.quantity + 1).fill(null) // Array of nulls of length quantity + 1
      .map((nada, index) => (
        <option className="quantity" key={index} value={index}>
          {index}
        </option>));
  }

  handleVariationSelect(event) {
    // Passing a tuple in as a select option's value converts it to a string
    // separated by commas. This would potentially create problems
    // if the description had commas in it.
    const [description, price] = event.target.value.split(',');
    this.setState({
      singlePrice: price,
      variation: description,
      pleaseSelectShown: false,
      totalPrice: (price * this.state.quantity).toFixed(2),
    });
  }

  handleQuantitySelect(event) {
    const quantity = +event.target.value;
    this.setState({
      quantity,
      totalPrice: (this.state.singlePrice * quantity).toFixed(2),
    });
  }

  handleBuyNowClick(event) {
    if (!this.state.variation) {
      this.setState({ pleaseSelectShown: true });
    }
    // More stuff will go here when I add modals
  }

  renderPleaseSelect(variationType) {
    return this.state.pleaseSelectShown ?
      <div className="please-select">
        Please select a {variationType.toLowerCase()}
      </div> :
      null;
  }

  render() {
    return (
      <div className="main-item" id="order-form">
        <h4 id="title">{this.props.data.title}</h4>

        <div id="price-and-question">
          <span id="price">${this.state.totalPrice}</span>
          <span id="q-span"><button id="q-button">Ask a question</button></span>
        </div>

        <div id="variations">
          {this.props.data.variationTypes.map(type => (
            <div key={type} className="variation-type">
              <div className="variation-name">{type}</div>

              <select onChange={this.handleVariationSelect}>

                {this.props.data.variations[type]
                  .map((variationTuple) => {
                    const [description, price] = variationTuple;

                    return (
                      <option className="variation" key={description} value={variationTuple}>
                        {`${description} ($${price.toFixed(2)})`}
                      </option>
                    );
                  })
                }

              </select>

              {this.renderPleaseSelect(type)}
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
          <button onClick={this.handleBuyNowClick}>
          Buy it now {'>'} {/* Render the character > without offending JSX */}
          </button>
        </div>

        <div id="add-cart">
          <button>
          Add to cart
          </button>
        </div>

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


/* Not implementing now, but leaving as notes for a stretch goal:

renderSpecialMessage() {
  const specialMessage = 'others want'; // Hard-coding for now
  if (specialMessage === 'others want') {
    return (
      <div>
        <span>((Image will go here, real thing is vector graphics in <g> tag)) </span>
        <span>
          <b>Other people want this. </b>
          {this.props.data.numInCarts} people have this in their carts right now.
        </span>
      </div>
    );
  }
  return null;
}

*/
