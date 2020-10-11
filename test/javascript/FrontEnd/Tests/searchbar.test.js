import React from 'react';
import SearchBar from 'SearchBar';
import SearchPhoto from 'SearchPhoto';
import { mount } from 'enzyme';
import {runAllPromises} from '../Utils/utils';
const BackendAPI = require('BackendAPI');

let activeId;
let setActiveId;
let searchBar;

jest.mock('BackendAPI');
const SearchImgs = BackendAPI.SearchImgs;

describe('<SearchBar />', () => {
  
  beforeEach(() =>{
    activeId = '';
    setActiveId = newActiveId => activeId = newActiveId;
    searchBar = mount(<SearchBar setActiveId={setActiveId}/>);
  });
  
  afterEach(() => {
    searchBar.unmount();
  });
  
  it('should search triggers photo search to backend', async () =>{
    //arrange
    SearchImgs.mockResolvedValue({photos: []});
    
    //act
    const searchForm = searchBar.find('.searchInput');
    await searchForm.simulate('change', {target: {value: 'whatever'}});
    await searchForm.simulate('submit');
    expect(SearchImgs).toHaveBeenCalled();
  });
  
  it('should create search images after submit', async ()=> {
    //arrange
    SearchImgs.mockResolvedValue({photos: [
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
  
  it('should pass the query to the api after submit', async () => {
    //arrange
    const expectedQuery = 'tacosAreUnique';
    
    //act
    const searchForm = searchBar.find('.searchInput');
    await searchForm.simulate('change', {target: {value: expectedQuery}});
    await searchForm.simulate('submit');
    
    //assert
    expect(SearchImgs.mock.calls).toContainEqual([expectedQuery]);
  });
  
  it('should set the active ID after clicking on an image', async () => {
    //arrange
    const expectedId = 'TacosAreTheBest';
    SearchImgs.mockResolvedValue({photos: [
      {id: expectedId, src: {small: 'https://imgur.com/gallery/3nSMulw'}}
    ]});
    const searchForm = searchBar.find('.searchInput');
    await searchForm.simulate('change', {target: {value: 'whatever'}});
    await searchForm.simulate('submit');
    await runAllPromises();
    searchBar.update();
    
    //act
    searchBar.find(SearchPhoto).simulate('click');
    
    //assert
    expect(expectedId).toEqual(activeId)
  });
});