import React from 'react';
import SearchBar from 'SearchBar';
import {SearchImgs} from "BackendAPI";
import { mount } from 'enzyme';

jest.mock('BackendAPI', () => ({
  SearchImgs: jest.fn()
}));

let activeId;
let setActiveId;
let searchBar;

beforeEach(() =>{
  searchBar = mount(<SearchBar />);
  activeId = '';
  setActiveId = newActiveId => activeId = newActiveId;
});

afterEach(() => {
  searchBar.unmount();
});

describe('<SearchBar />', () =>{
  it('search triggers photo search to backend', () =>{
    //arrange
    let photoData = {photos: [{id: 'Taco', src: {small: 'https://imgur.com/gallery/3nSMulw'}}]};
    SearchImgs.mockResolvedValue(photoData);
    //act
    searchBar.find('.searchInput').simulate('change', {target: {value: '23'}});
    searchBar.find('.searchInput').simulate('submit');
    
    //assert
    expect(SearchImgs).toHaveBeenCalled();
  });
});