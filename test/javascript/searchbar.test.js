import React from 'react';
import SearchBar from 'SearchBar';
import {SearchImgs} from "BackendAPI";
import { mount } from 'enzyme';

jest.mock('BackendAPI');
const runAllPromises = () => new Promise(setImmediate);

let activeId;
let setActiveId;
let searchBar;

beforeEach(() =>{
  searchBar = mount(<SearchBar searchImgs={SearchImgs} />);
  activeId = '';
  setActiveId = newActiveId => activeId = newActiveId;
});

afterEach(() => {
  searchBar.unmount();
});

describe('<SearchBar />', () =>{
  it('should search triggers photo search to backend', async () =>{
    //arrange
    //act
    await searchBar.find('.searchInput').simulate('change', {target: {value: '23'}});
    await searchBar.find('.searchInput').simulate('submit');
    expect(SearchImgs).toHaveBeenCalled();
    
    //assert
    await runAllPromises();
    searchBar.update();
    expect(searchBar).toMatchSnapshot();
  });
});