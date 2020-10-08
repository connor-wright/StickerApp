import React from 'react';
import SearchBar from 'SearchBar';
import {SearchImgs} from "BackendAPI";
import { mount } from 'enzyme';
import SearchPhoto from 'SearchPhoto';

jest.mock('BackendAPI')

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
  it('should search triggers photo search to backend', () =>{
    //arrange
    //act
    searchBar.find('.searchInput').simulate('change', {target: {value: '23'}});
    searchBar.find('.searchInput').simulate('submit');
    
    //assert
    expect(SearchImgs).toHaveBeenCalled();
    //expect(searchBar).toMatchSnapshot();
  });
  
  it('should populate search images based on data', () => {
    //assert
    
    //act
    searchBar.find('.searchInput').simulate('change', {target: {value: '23'}});
    searchBar.find('.searchInput').simulate('submit');
    
    //assert
    expect(searchBar).toMatchSnapshot();
  });
});