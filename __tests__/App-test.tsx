/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.

import {act, render} from '@testing-library/react-native';

global.fetch = jest.fn();

describe('fetch from storage', () => {
  it('renders correctly', () => {
    const tree = render(<App />);
    expect(tree).toMatchSnapshot();
  });

  //I am not 100% sure this is the best way to write the test to mock the api,
  // but I spent a long time to make this work and did what I can

  test('Should render a list of items', async () => {
    const tree = render(<App />);
    await act(() => Promise.resolve());
    act(async () => {
      jest.advanceTimersByTime(1500); // useEffect
      act(() => Promise.resolve());
      act(() => Promise.resolve());
      let listItems = await tree.findAllByTestId('list-item');
      expect(listItems.length).toBeGreaterThan(0);
    });
  });

  test('Should render a placeholder text', async () => {
    const tree = render(<App />);
    act(async () => {
      jest.advanceTimersByTime(1500);
      Promise.reject();
      let error = tree.queryByText(/Cat breeds will appear here/i);
      expect(error).toBeTruthy();
    });
  });
});
