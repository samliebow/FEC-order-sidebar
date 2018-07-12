import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import giftIcon from '@fortawesome/fontawesome-free-solid/faGift';
import styles from '../styles/Overview.css';

const Overview = (props) => {
  const renderItemType = () => {
    if (props.data.isHandmade) {
      const text = props.data.isProduct ? 'Handmade item' : 'Handmade supply';
      return <li styleName="overviewList">{text}</li>;
    }
    // Need to check later if there are other item types to render
    return null;
  };

  const renderVintage = function renderVintage() {
    if (props.data.whenMade === 'To order') {
      return <li styleName="overviewList">Made to order</li>;
    }
    if (props.data.whenMade !== 'Recently') {
      return <li styleName="overviewList">Vintage item from the {'\''}{props.data.whenMade}</li>;
    }
    return null;
  };

  const renderGiftCardOption = function renderGiftCardOption() {
    return props.data.acceptGiftCards ?
      <div>
        <FontAwesomeIcon icon={giftIcon} /> {' '}
        <span styleName="overviewList">This shop accepts Mini Market gift cards</span>
      </div> :
      undefined;
  };

  return (
    <div styleName="mainItem" id="overview">
      <h2 styleName="overviewTitle">Overview</h2>
      <ul>
        {renderItemType()}
        <li styleName="overviewList">Materials: {props.data.materials.join(', ')}</li>
        {renderVintage()}
        <li styleName="overviewList">
          Feedback:{' ' /* Trailing space */}
          <a href="#" styleName="feedbackLink">{props.data.numReviews} reviews</a>
          {/* These links go to other pages, which is outside scope */}
        </li>
        <li styleName="overviewList">
          Favorited by:{' '}
          <a href="#" styleName="feedbackLink">{props.data.numFavorites} people</a>
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

export default CSSModules(Overview, styles);
