require 'test_helper'

class V1::StickerControllerTest < ActionDispatch::IntegrationTest
  test "should be able to create a sticker" do
    post '/v1/sticker',
      params: {photo:{
                photo_id: 'asdf',
                xpos: '0',
                ypos: '0',
                url: 'https:\\whater.org',
                artist: 'artist artist'
              }}
    
    assert_response :success
  end
  
  test "should be able to retrieve created sticker" do
    get '/v1/stickers'
    
    assert_response :success
    
    stickers = JSON.parse(@response.body)
    assert_equal 1, stickers.count
    assert_equal "TestString", stickers[0]["photo_id"]
  end
  
  test "should be able to create and retrieve sticker" do 
    expected_photo_id = 'photo id 1'
    expected_xpos     = 45
    expected_ypos     = 76
    expected_url      = 'https:\\whatever.org'
    expected_artist   = 'VanGo'
    
    post '/v1/sticker',
      params: {photo: {
                photo_id: expected_photo_id, 
                xpos:     expected_xpos, 
                ypos:     expected_ypos,
                url:      expected_url,
                artist:   expected_artist,
              }}
    
    assert_response :success
    
    get '/v1/stickers'
    assert_response :success
    
    stickers = JSON.parse(@response.body)
    sticker = stickers.find { |sticker| sticker['photo_id'] == expected_photo_id}
    
    assert_equal expected_xpos,   sticker['xpos']
    assert_equal expected_ypos,   sticker['ypos']
    assert_equal expected_url,    sticker['url']
    assert_equal expected_artist, sticker['artist']
  end
end
