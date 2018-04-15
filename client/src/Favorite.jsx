import React from 'react';

class Favorite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorited: false,
      added: false,
      userLists: [],
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
      <span id="favorite-button" onClick={this.toggleFavorite}>
        {this.state.favorited ?
          '[rHrt] Favorited' :
          '[gHrt] Favorite'
        }
      </span>
    );
  }

  renderAdded() {
    return (
      <span id="add-to-button" onClick={this.addToList}> 
        {this.state.added ?
          '[chk] Added' :
          '[noChk] Add to'
        }
      </span>
    );
  }

  render() {
    return (
      <div className="mainItem" id="favorite-component">
        {this.renderFavorite()}
        &nbsp;
        {this.renderAdded()}
      </div>
    );
  }
}

export default Favorite;
