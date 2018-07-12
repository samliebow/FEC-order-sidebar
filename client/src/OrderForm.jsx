import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from '../styles/OrderForm.css';

class OrderForm extends React.Component {
  constructor(props) {
    super(props);
    this.allVariants = this.props.data.variants.allVariants;
    const [, , lowestPrice, lowestPriceQuantity] = this.getLowestPricedItem();
    this.state = {
      singlePrice: lowestPrice,
      // toFixed solves floating point issue; it returns a string, but that's not a problem here.
      // The ternary adds a '+' iff there are variants.
      totalPrice: `${lowestPrice.toFixed(2)}${this.props.data.variants.dimensions.length ? '+' : ''}`,
      quantity: 1,
      variantQuantity: lowestPriceQuantity,
      dimensionZeroVariant: '',
      dimensionOneVariant: '',
      pleaseSelectShownZero: false, // e.g. "Please select a size"
      pleaseSelectShownOne: false,
    };

    this.handleOptionSelect = this.handleOptionSelect.bind(this);
    this.handleQuantitySelect = this.handleQuantitySelect.bind(this);
    this.handleBuyNowClick = this.handleBuyNowClick.bind(this);
  }

  getLowestPricedItem(variantsArray = this.allVariants) {
    // Variants are [dim1, dim2, price, quantity]
    return variantsArray.reduce((cheapest, variant) => (cheapest[2] < variant[2] ? cheapest : variant));
  }

  getMatchingVariants(optionName, dimensionNum) {
    const optionMatches = this.allVariants
      .filter(variant => variant[dimensionNum] === optionName);

    const otherVariantName = dimensionNum === 0 ?
      this.state.dimensionOneVariant : this.state.dimensionZeroVariant;
    const otherVariantSet = !!otherVariantName; // true if not empty

    if (otherVariantSet) {
      return optionMatches
        .filter(variant => variant[+!dimensionNum] === otherVariantName); // +! is 0 if 1, 1 if 0
    }
    return optionMatches;
  }

  handleOptionSelect(event, dimensionNum) {
    const optionName = event.target.value;
    let matchingVariants;
    const otherVariantName = dimensionNum === 0 ?
      this.state.dimensionOneVariant : this.state.dimensionZeroVariant;
    const otherVariantSet = !!otherVariantName;
    if (!optionName && !otherVariantSet) {
      matchingVariants = this.allVariants;
    } else if (!optionName) {
      matchingVariants = this.getMatchingVariants(otherVariantName, +!dimensionNum);
    } else {
      matchingVariants = this.getMatchingVariants(optionName, dimensionNum);
    }
    const [, , singlePrice, variantQuantity] = this.getLowestPricedItem(matchingVariants);
    if (dimensionNum === 0) {
      this.setState({
        dimensionZeroVariant: optionName,
        singlePrice,
        totalPrice: (singlePrice * this.state.quantity).toFixed(2),
        pleaseSelectShownZero: false,
        variantQuantity,
      });
    } else {
      this.setState({
        dimensionOneVariant: optionName,
        singlePrice,
        totalPrice: (singlePrice * this.state.quantity).toFixed(2),
        pleaseSelectShownOne: false,
        variantQuantity,
      });
    }
  }

  handleQuantitySelect(event) {
    const quantity = +event.target.value;
    this.setState({
      quantity,
      totalPrice: (this.state.singlePrice * quantity).toFixed(2),
    });
  }

  handleBuyNowClick(event) {
    if (!this.state.dimensionZeroVariant) {
      this.setState({ pleaseSelectShownZero: true });
    }
    if (!this.state.dimensionOneVariant) {
      this.setState({ pleaseSelectShownOne: true });
    }
    // More stuff will go here when I add modals
  }

  makeQuantityOptions(quantity) {
    return Array(quantity + 1).fill(null) // Array of nulls of length quantity + 1
      .map((nada, index) => (
        <option className="quantity" key={index} value={index}>
          {index}
        </option>)).slice(1);
  }

  renderOption(optionName, dimensionNum) {
    const matchingVariants = this.getMatchingVariants(optionName, dimensionNum);
    let price;
    if (matchingVariants.length === 1) {
      price = matchingVariants[0][2].toFixed(2);
    } else {
      const prices = matchingVariants.map(variant => variant[2]);
      price = `${Math.min(...prices).toFixed(2)}-${Math.max(...prices).toFixed(2)}`;
    }
    return (
      <option styleName="variantOption" key={optionName} value={optionName}>
        {`${optionName} ($${price})`}
      </option>
    );
  }

  renderPleaseSelect(dimension, dimensionNum) {
    const test = dimensionNum === 0 ?
      this.state.pleaseSelectShownZero :
      this.state.pleaseSelectShownOne;
    return test ?
      <div styleName="pleaseSelect">
        Please select a {dimension.toLowerCase()}
      </div> :
      null;
  }

  render() {
    return (
      <div styleName="mainItem">
        <h1 styleName="title">{this.props.data.title}</h1>

        <div styleName="pAndQ">
          <span styleName="price">${this.state.totalPrice}</span>
          <span styleName="qSpan"><a styleName="qButton">Ask a question</a></span>
        </div>

        <div id="variants">
          {this.props.data.variants.dimensions.map((dimension, dimensionNum) => (
            <div key={dimension.name} className="variant-dimension">
              <div styleName="variantDimensionName">{dimension.name}</div>
              <select
                value={dimensionNum ?
                  this.state.dimensionOneVariant :
                  this.state.dimensionZeroVariant}
                onChange={event => this.handleOptionSelect(event, dimensionNum)}
                styleName="variantSelect"
              >
                <option styleName="variantOption" key={`noChoice${dimensionNum}`} value="">
                  Select a {dimension.name.toLowerCase()}
                </option>
                {dimension.options.map(optionName => this.renderOption(optionName, dimensionNum))}
              </select>
              {this.renderPleaseSelect(dimension.name, dimensionNum)}
            </div>))}

        </div>

        <div id="quantity">
          <div styleName="variantDimensionName">Quantity</div>
          <select onChange={this.handleQuantitySelect} styleName="quantitySelect">
            {this.makeQuantityOptions(this.state.variantQuantity)}
          </select>
        </div>

        <div id="buy-now">
          <button styleName="buyNow" onClick={this.handleBuyNowClick}>
          Buy it now {'>'} {/* Render the character > without offending JSX */}
          </button>
        </div>

        <div id="add-cart">
          <button styleName="addToCart">
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
    variants: PropTypes.shape({
      dimensions: PropTypes.arrayOf(PropTypes.object),
      allVariants: PropTypes.arrayOf(PropTypes.array),
    }),
    quantity: PropTypes.number,
    // numInCarts: PropTypes.number,
  }).isRequired,
};

export default CSSModules(OrderForm, styles);


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
