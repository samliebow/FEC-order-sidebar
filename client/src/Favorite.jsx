import React from 'react';
import CSSModules from 'react-css-modules';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import heart from '@fortawesome/fontawesome-free-solid/faHeart';
import bars from '@fortawesome/fontawesome-free-solid/faBars';
import styles from '../styles/Favorite.css';

class Favorite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorited: false,
      added: false,
      userLists: [], // To be used later on
    };
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.addToList = this.addToList.bind(this);
  }

  toggleFavorite() {
    this.setState({
      favorited: !this.state.favorited,
    });
  }

  addToList() {
    // Will add actual functionality beyond toggling later
    this.setState({
      added: !this.state.added,
    });
  }

  renderFavorite() {
    return (
      <span
        styleName="box"
        onClick={this.toggleFavorite}
        role="button"
        tabIndex={0}
        onKeyPress={(event) => { if (event.key === 'Enter') { this.toggleFavorite(); } }}
      >
        {this.state.favorited ?
          <span>
            <span styleName="redHeart">
              <FontAwesomeIcon icon={heart} />{' '}
            </span>
            Favorited
          </span> :
          <span>
            <span styleName="grayHeart">
              <FontAwesomeIcon icon={heart} />{' '}
            </span>
            Favorite
          </span>
        }
      </span>
    );
  }

  renderAdded() {
    return (
      <span
        styleName="box"
        onClick={this.addToList}
        role="button"
        tabIndex={0}
        onKeyPress={(event) => { if (event.key === 'Enter') { this.addToList(); } }}
      >
        {this.state.added ?
          <span>
            <img styleName="checkedList" src="checkedList.png" alt="" /> Added
          </span> :
          <span>
            <FontAwesomeIcon icon={bars} /> Add to
          </span>
        }
      </span>
    );
  }

  render() {
    return (
      <div styleName="mainItem" id="favorite-component">
        {this.renderFavorite()}
        {' '}
        {this.renderAdded()}
      </div>
    );
  }
}

export default CSSModules(Favorite, styles);
