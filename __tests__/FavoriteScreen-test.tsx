import React from 'react';
import {render} from '@testing-library/react-native';
import FavoritesScreen from '../src/FavoritesScreen';
import {catMock} from '../__mocks__/cats';
import {minifyCats} from '../misc/functions';

// jest.mock('../misc/functions');

let favoriteScreen = (
  <FavoritesScreen favorited={[]} onPress={() => {}} catExist={() => true} />
);

it('Should render cats i like text in the header', () => {
  const tree = render(favoriteScreen);
  const allCats = tree.queryByText(/cats i like/i);
  expect(allCats).toBeDefined();
});

it('should show status text when there is no favorites', () => {
  const tree = render(favoriteScreen);
  const statusText = tree.queryByText(/Favorited pets appear here/i);
  expect(statusText).toBeTruthy();
});

it('Should output show only the number of items in favorites', () => {
  const tree = render(
    <FavoritesScreen
      favorited={minifyCats(catMock)}
      onPress={() => {}}
      catExist={() => true}
    />,
  );
  const listItems = tree.queryAllByTestId('favorites-view');
  expect(listItems.length).toBe(catMock.length);
});
