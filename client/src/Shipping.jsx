import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from '../styles/Shipping.css';

class Shipping extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      destCountry: 'United States',
      destCountryOptionValue: '',
      destZip: 94102,
      destZipInputValue: '',
      destSelectShown: false,
    };
    this.toggleDestSelect = this.toggleDestSelect.bind(this);
    this.handleZipUpdate = this.handleZipUpdate.bind(this);
    this.handleCountryUpdate = this.handleCountryUpdate.bind(this);
    this.countries = ['United States', 'Canada', 'Mexico', 'United Kingdom', 'France', 'Germany'];
  }

  toggleDestSelect() {
    this.setState({
      destSelectShown: !this.state.destSelectShown,
    });
  }

  handleCountryUpdate(event) {
    this.setState({
      destCountryOptionValue: event.target.value,
    });
  }

  handleZipUpdate(event) {
    event.preventDefault();
    if (event.key.match(/[0-9]/)) {
      this.setState({
        destZipInputValue: this.state.destZipInputValue + event.key,
      });
    } else if (event.key === 'Enter') {
      this.setState({
        destZip: this.state.destZipInputValue || this.state.destZip,
        destCountry: this.state.destCountryOptionValue || this.state.destCountry,
        destZipInputValue: '',
        destCountryOptionValue: '',
      });
    }
  }

  renderDestSelect() {
    return this.state.destSelectShown ? (
      <div styleName="destSelect">
        <div styleName="countrySelectDiv">
          <div styleName="selectHeader">Country </div>
          <select
            styleName="destInput"
            defaultValue="United States"
            onChange={this.handleCountryUpdate}
          >
            {this.countries.map(country => (
              <option
                styleName="shipping"
                key={country}
                value={country}
              >
                {country}
              </option>))
          }
          </select>
        </div>
        <div styleName="zipSelectDiv">
          <div styleName="selectHeader">Zip or postal code</div>
          <input
            styleName="destInput"
            type="text"
            placeholder={this.state.destZip}
            value={this.state.destZipInputValue}
            onKeyPress={this.handleZipUpdate}
          />
        </div>
      </div>
    ) : null;
  }

  render() {
    return (
      <div styleName="mainItem" id="shipping">
        <h2 styleName="shippingTitle">Shipping & returns</h2>

        <div styleName="shippingHeader">Ready to ship in {this.props.data.timeToShip}</div>
        <div styleName="shippingText">From {this.props.data.shipOrigin} </div>
        <div styleName="shippingText">
          <span >$7.35 shipping to </span>
          <span
            styleName="shippingDest"
            id="destination"
            onClick={this.toggleDestSelect}
            role="button"
            tabIndex={0}
            onKeyPress={(event) => { if (event.key === 'Enter') { this.toggleDestSelect(); } }}
          >
            {this.state.destCountry}, {this.state.destZip}
          </span>
        </div>

        {this.renderDestSelect()}

        <div styleName="shippingUpdates">Shipping upgrades available in the cart</div>
        <br />
        <div styleName="shippingHeader">Returns and exchanges accepted</div>
        <div styleName="shippingText">Exceptions may apply. <a styleName="shippingText" href="#">See return policy</a></div>
        <br />
      </div>
    );
  }
}

Shipping.propTypes = {
  data: PropTypes.shape({
    timeToShip: PropTypes.string.isRequired,
    shipOrigin: PropTypes.string.isRequired,
    acceptReturn: PropTypes.bool.isRequired,
    acceptExchange: PropTypes.bool.isRequired,
    acceptCancel: PropTypes.bool.isRequired,
  }).isRequired,
};

export default CSSModules(Shipping, styles);
