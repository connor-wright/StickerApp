import React from 'react';
import App from 'App';
import {cleanup, fireEvent, render} from '@testing-library/react';



test('1 + 1 equals 2', () => {
  console.log(App.toString());
  expect(1 +1).toBe(2);
})