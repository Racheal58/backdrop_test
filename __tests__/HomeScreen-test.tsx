import React from 'react';
import {render} from '@testing-library/react-native';
import {HomeScreen} from '../src/HomeScreen';

it('Should render all cats in the header', () => {
  const tree = render(
    <HomeScreen
      loading={true}
      error={false}
      fetchCatsState={[]}
      onPress={() => {}}
      catExist={() => true}
    />,
  );
  const allCats = tree.queryByText(/all cats/);
  expect(allCats).toBeDefined();
});
