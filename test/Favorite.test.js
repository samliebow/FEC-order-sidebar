import React from 'react';
import Favorite from '../client/src/Favorite.jsx';

describe('Favorite', () => {
  const wrapper = shallow(<Favorite />);

  it('flips the favorite button status on toggleFavorite', () => {
    const favorite = wrapper.instance();
    let favoriteButton = render(favorite.renderFavorite());
    expect(favoriteButton.text()).toBe(' Favorite');
    favorite.toggleFavorite();
    favoriteButton = render(favorite.renderFavorite());
    expect(favoriteButton.text()).toBe(' Favorited');
    favorite.toggleFavorite();
    favoriteButton = render(favorite.renderFavorite());
    expect(favoriteButton.text()).toBe(' Favorite');
  });

  it('flips added status on addToList (temporary)', () => {
    const favorite = wrapper.instance();
    let addButton = render(favorite.renderAdded());
    expect(addButton.text()).toBe(' Add to list');
    favorite.addToList();
    addButton = render(favorite.renderAdded());
    expect(addButton.text()).toBe(' Added');
    favorite.addToList();
    addButton = render(favorite.renderAdded());
    expect(addButton.text()).toBe(' Add to list');
  });
});
