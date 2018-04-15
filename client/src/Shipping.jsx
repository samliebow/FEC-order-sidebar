import React from 'react';
import PropTypes from 'prop-types';

class Shipping extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      destCountry: 'United States',
      destCountryInProgress: '',
      // This feels hacky: I want to update state only once the input is submitted,
      // but also want to maintain all state in React, not in the form.
      destZip: 94102,
      destZipInProgress: '',
      destSelectShown: false,
    };
    this.toggleDestSelect = this.toggleDestSelect.bind(this);
    this.handleZipUpdate = this.handleZipUpdate.bind(this);
    this.handleCountryUpdate = this.handleCountryUpdate.bind(this);
  }

  toggleDestSelect() {
    this.setState({
      destSelectShown: !this.state.destSelectShown,
    });
  }

  handleCountryUpdate(event) {
    this.setState({
      destCountryInProgress: event.target.value,
    });
  }

  handleZipUpdate(event) {
    event.preventDefault();
    if (event.key.match(/[0-9]/)) {
      this.setState({
        destZipInProgress: this.state.destZipInProgress + event.key,
      });
    } else if (event.key === 'Enter') {
      this.setState({
        destZip: this.state.destZipInProgress || this.state.destZip,
        destCountry: this.state.destCountryInProgress || this.state.destCountry,
        destZipInProgress: '',
        destCountryInProgress: '',
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
            {/* Add more options and remove hardcoding later */}
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
          </select>
          <input
            type="text"
            placeholder={this.state.destZip}
            value={this.state.destZipInProgress}
            onKeyPress={this.handleZipUpdate}
          />
        </form>

      </div>
    ) : null;
  }

  render() {
    return (
      <div className="mainItem" id="shipping">
        <h4>Shipping & returns</h4>
        <b>Ready to ship in {this.props.data.timeToShip}</b> <br />
        From {this.props.data.shipOrigin} <br />
        <span>$7.35 shipping to </span>
        <span id="destination" onClick={this.toggleDestSelect}>
          {this.state.destCountry}, {this.state.destZip}
        </span>
        <br />
        {this.renderDestSelect()}
        <span id="upgrades-avail">Shipping upgrades available in the cart</span> <br />
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
