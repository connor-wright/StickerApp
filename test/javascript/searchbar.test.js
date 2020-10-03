import React from 'react';
import App from 'App';
import SearchBar from 'SearchBar'
import {cleanup, fireEvent, render} from '@testing-library/react';

test('Searching', () => {
  console.log(App.toString());
  expect(1 + 1).toBe(2);
})