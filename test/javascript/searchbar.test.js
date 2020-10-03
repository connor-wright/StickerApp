import React from 'react';
import SearchBar from 'SearchBar';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import "isomorphic-fetch";

let activeId;
let setActiveId;

beforeEach(() =>{
  activeId = '';
  setActiveId = newActiveId => activeId = newActiveId;
});

test('Searching returns images', () => {
  //arrange
  const searchBar = render(<SearchBar activeId={setActiveId}/>);
  const inputBar = screen.getByTestId('searchInput');
  //act
  fireEvent.change(inputBar, {target: {value: '23'}});
  fireEvent.submit(inputBar);
  //assert
  
})