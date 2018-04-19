import React from 'react';
import PropTypes from 'prop-types';

const Overview = (props) => {
  const renderItemType = () => {
    if (props.data.isHandmade) {
      const text = props.data.isProduct ? 'Handmade item' : 'Handmade supply';
      return <li className="overview-list">{text}</li>;
    }
    // Need to check later if there are other item types to render
    return null;
  };

  const renderVintage = function renderVintage() {
    if (props.data.whenMade === 'To order') {
      return <li className="overview-list">Made to order</li>;
    }
    if (props.data.whenMade !== 'Recently') {
      return <li className="overview-list">Vintage item from the {'\''}{props.data.whenMade}</li>;
    }
    return null;
  };

  const renderGiftCardOption = function renderGiftCardOption() {
    return props.data.acceptGiftCards ?
      <div>
        <span id="gift-card-icon">((Img))</span>
        <span id="gift-cart-msg">This shop accepts Etsy gift cards</span>
      </div> :
      undefined;
  };

  return (
    <div className="main-item" id="overview">
      <h4>Overview</h4>
      <ul>
        {renderItemType()}
        <li className="overview-list">Materials: {props.data.materials.join(', ')}</li>
        {renderVintage()}
        <li className="overview-list">
          Feedback:
          <a href="#">{props.data.numReviews} reviews</a>
          {/* These links go to other pages, which is outside scope */}
        </li>
        <li className="overview-list">
          Favorited by:
          <a href="#">{props.data.numFavorites} people</a>
        </li>
      </ul>

      {renderGiftCardOption()}
    </div>
  );
};

Overview.propTypes = {
  data: PropTypes.shape({
    materials: PropTypes.arrayOf(PropTypes.string),
    isHandmade: PropTypes.bool.isRequired,
    isProduct: PropTypes.bool.isRequired,
    whenMade: PropTypes.string.isRequired,
    numReviews: PropTypes.number.isRequired,
    numFavorites: PropTypes.number.isRequired,
    acceptGiftCards: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Overview;
