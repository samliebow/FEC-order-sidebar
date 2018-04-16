import React from 'react';

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
        id="favorite-button"
        onClick={this.toggleFavorite}
        role="button"
        tabIndex={0}
        onKeyPress={(event) => { if (event.key === 'Enter') { this.toggleFavorite(); } }}
      >
        {this.state.favorited ?
          '[rHrt] Favorited' : // rHrt and gHrt are stand-ins for a red or grey heart icon
          '[gHrt] Favorite'
        }
      </span>
    );
  }

  renderAdded() {
    return (
      <span
        id="add-to-button"
        onClick={this.addToList}
        role="button"
        tabIndex={0}
        onKeyPress={(event) => { if (event.key === 'Enter') { this.addToList(); } }}
      >
        {this.state.added ?
          '[chk] Added' : // As above, stand-ins for icons
          '[noChk] Add to'
        }
      </span>
    );
  }

  render() {
    return (
      <div className="main-item" id="favorite-component">
        {this.renderFavorite()}
        &nbsp;
        {this.renderAdded()}
      </div>
    );
  }
}

export default Favorite;
