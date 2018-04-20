import React from 'react';
import Favorite from '../client/src/Favorite.jsx';

describe('Favorite', () => {
  const wrapper = shallow(<Favorite />);

  it('flips the favorite button status on toggleFavorite', () => {
    const favorite = wrapper.instance();
    let favoriteButton = render(favorite.renderFavorite());
    expect(favoriteButton.text()).toBe('[gHrt] Favorite');
    favorite.toggleFavorite();
    favoriteButton = render(favorite.renderFavorite());
    expect(favoriteButton.text()).toBe('[rHrt] Favorited');
    favorite.toggleFavorite();
    favoriteButton = render(favorite.renderFavorite());
    expect(favoriteButton.text()).toBe('[gHrt] Favorite');
  });

  it('flips added status on addToList (temporary)', () => {
    const favorite = wrapper.instance();
    let addButton = render(favorite.renderAdded());
    expect(addButton.text()).toBe('[noChk] Add to');
    favorite.addToList();
    addButton = render(favorite.renderAdded());
    expect(addButton.text()).toBe('[chk] Added');
    favorite.addToList();
    addButton = render(favorite.renderAdded());
    expect(addButton.text()).toBe('[noChk] Add to');
  });
});
