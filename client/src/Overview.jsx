import React from 'react';
import PropTypes from 'prop-types';

const Overview = (props) => {
  const renderItemType = () => {
    if (props.data.isHandmade) {
      const text = props.data.isProduct ? 'Handmade item' : 'Handmade supply';
      return <li>{text}</li>;
    }
    // Some more logic here for other item types?
    return null;
  };

  const renderVintage = function renderVintage() {
    if (props.data.whenMade === 'To order') {
      return <li>Made to order</li>;
    }
    if (props.data.whenMade !== 'Recently') {
      return <li>Vintage item from the ${props.data.whenMade}</li>;
    }
    return null;
  };

  const renderGiftCardOption = function renderGiftCardOption() {
    return props.data.acceptGiftCards ?
      <div><span>Img</span><span>This shop accepts Etsy gift cards</span></div> :
      undefined;
  };

  return (
    <div className="mainItem" id="overview">
      <h4>Overview</h4>
      <ul>
        {renderItemType()}
        <li>Materials: {props.data.materials.join(', ')}</li>
        {renderVintage()}
        <li>Feedback: <a href="#">{props.data.numReviews} reviews</a></li>
        <li>Favorited by: <a href="#">{props.data.numFavorites} people</a></li>
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
