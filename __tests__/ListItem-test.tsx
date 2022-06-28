import React from 'react';
import {render} from '@testing-library/react-native';
import ListItem from '../components/ListItem';
import {NavigationContainer} from '@react-navigation/native';

// jest.mock('../misc/functions');
const mockFn = jest.fn();

let element = (
  <NavigationContainer>
    <ListItem
      item={{name: 'cats', image: 'someurl', id: 'xyza'}}
      onPress={mockFn}
      catExist={true}
    />
  </NavigationContainer>
);

let unlikedElement = (
  <NavigationContainer>
    <ListItem
      item={{name: 'cats', image: 'someurl', id: 'xyza'}}
      onPress={mockFn}
      catExist={false}
    />
  </NavigationContainer>
);

it('Should display cat name in tree', () => {
  const tree = render(element);
  const itemText = tree.queryByText(/cats/i);
  expect(itemText).toBeTruthy();
});

it('should show empty heart icon when pet is not liked', () => {
  const tree = render(unlikedElement);
  const likeButton = tree.queryByTestId('not-liked');
  expect(likeButton).toBeTruthy();
});

it('should show red heart icon when pet is liked', () => {
  const tree = render(element);
  const likeButton = tree.queryByTestId('liked');
  expect(likeButton).toBeTruthy();
});
