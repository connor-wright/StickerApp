import React from 'react';
import Sticker from 'Sticker';
import Stickers from 'Stickers';
import { mount } from 'enzyme';
import {runAllPromises} from '../Utils/utils';
const BackendAPI = require('BackendAPI');

jest.mock('BackendAPI');
const GetStickers = BackendAPI.GetStickers;
const GetImgurImg = BackendAPI.GetImgurImg;
const PostSticker = BackendAPI.PostSticker;
let stickersComponent = null;
let activeId = null;

//There are some weird behaviors with enzyme and to match snapshot
//they dont seem to be in sync. 
//TODO figure this out
describe('<Stickers />' , () => {
  beforeAll(() => {
    GetStickers.mockResolvedValue([]);
  });
  
  beforeEach(() => {
    activeId = 'Tacos';
    stickersComponent = mount(<Stickers activeId={activeId}/>);
  });
  
  afterEach(() => {
    stickersComponent.unmount();
  });
  
  it('Should request stickers on mount', () => {
    expect(GetStickers).toHaveBeenCalled();
  });
  
  it('Should display stickers after mount', async () => {
    //arrange
    GetStickers.mockResolvedValue([{
      url: 'https://imgur.com/gallery/3nSMulw', 
      xpos: '25',
      ypos: '45',
      id: 'Tacos'
    }]);
    
    //act
    stickersComponent.unmount();
    stickersComponent = mount(<Stickers/>);
    await runAllPromises();
    stickersComponent.update();
    
    //assert
    expect(stickersComponent).toMatchSnapshot();
  });
  
  it('Should add a sticker based on active ID on click', async () => {
    //arrange
    //weird issue where react will think there is two sticker 
    //elements with the same keys even though there isnt. 
    activeId = 'TwoTacos';
    stickersComponent.unmount();
    stickersComponent = mount(<Stickers activeId={activeId}/>);
    await runAllPromises();
    
    const expectedXpos = 25;
    const expectedYpos = 75;
    const url = 'https://imgur.com/gallery/3nSMulw';
    const expectedPostNewPhotoArgs = {
      img_id: activeId,
      url: url,
      xpos: expectedXpos,
      ypos: expectedYpos
    };
    
    GetImgurImg.mockResolvedValue({data: {
      id: activeId,
      link: url
    }});
    PostSticker.mockResolvedValue({
      url: url, 
      xpos: expectedXpos,
      ypos: expectedYpos,
      id: activeId
    });
    
    //act
    stickersComponent.simulate(
      'click', {clientX: expectedXpos, clientY: expectedYpos});
    await runAllPromises();
    await stickersComponent.update();
    
    //assert
    expect(GetImgurImg.mock.calls).toContainEqual([activeId]);
    expect(PostSticker.mock.calls).toContainEqual([expectedPostNewPhotoArgs]);
    //TODO need to assert that the sticker is created
  });
});