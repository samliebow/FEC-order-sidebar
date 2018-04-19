import React from 'react';
import PropTypes from 'prop-types';

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
      <div id="destSelect">
        <div>
          <span id="countrySelectHeader">Country </span>
          <span id="zipSelectHeader">Zip or postal code</span>
        </div>
        <form>
          <select defaultValue="United States" onChange={this.handleCountryUpdate}>
            {this.countries.map(country => <option key={country} value={country}>{country}</option>)}
          </select>
          <input
            type="text"
            placeholder={this.state.destZip}
            value={this.state.destZipInputValue}
            onKeyPress={this.handleZipUpdate}
          />
        </form>

      </div>
    ) : null;
  }

  render() {
    return (
      <div className="main-item" id="shipping">
        <h4>Shipping & returns</h4>

        <b>Ready to ship in {this.props.data.timeToShip}</b> <br />
        From {this.props.data.shipOrigin} <br />
        <span>$7.35 shipping to </span>
        <span
          id="destination"
          onClick={this.toggleDestSelect}
          role="button"
          tabIndex={0}
          onKeyPress={(event) => { if (event.key === 'Enter') { this.toggleDestSelect(); } }}
        >
          {this.state.destCountry}, {this.state.destZip}
        </span> <br />

        {this.renderDestSelect()}

        <span id="upgrades-available">Shipping upgrades available in the cart</span> <br />
        <br />

        <b>Returns and exchanges accepted</b> <br />
        Exceptions may apply. <a href="#">See return policy</a> <br />
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

export default Shipping;
