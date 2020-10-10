import React from 'react';
import SearchBar from 'SearchBar';
const BackendAPI = require('BackendAPI');
import { mount } from 'enzyme';

jest.mock('BackendAPI');
const runAllPromises = () => new Promise(setImmediate);

let activeId;
let setActiveId;
let searchBar;

beforeEach(() =>{
  searchBar = mount(<SearchBar/>);
  activeId = '';
  setActiveId = newActiveId => activeId = newActiveId;
});

afterEach(() => {
  searchBar.unmount();
});

describe('<SearchBar />', () =>{
  it('should search triggers photo search to backend', async () =>{
    //arrange
    BackendAPI.SearchImgs.mockResolvedValue({photos: []});
    
    //act
    const searchForm = searchBar.find('.searchInput');
    await searchForm.simulate('change', {target: {value: 'whatever'}});
    await searchForm.simulate('submit');
    expect(BackendAPI.SearchImgs).toHaveBeenCalled();
  });
  
  it('should create search images after submit', async ()=> {
    //arrange
    BackendAPI.SearchImgs.mockResolvedValue({photos: [
      {id: 'Taco', src: {small: 'https://imgur.com/gallery/3nSMulw'}}
    ]});
    
    //act
    const searchForm = searchBar.find('.searchInput');
    await searchForm.simulate('change', {target: {value: 'whatever'}});
    await searchForm.simulate('submit');
    
    //assert
    await runAllPromises();
    searchBar.update();
    expect(searchBar).toMatchSnapshot();
  });
});