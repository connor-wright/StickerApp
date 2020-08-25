require 'test_helper'

class V1::StickerControllerTest < ActionDispatch::IntegrationTest
  test "should be able to create a sticker" do
    post '/v1/sticker',
      params: {id: '1', xpos: '0', ypos: '0'}
    
    assert_response :success
  end
  
  test "should be able to retrieve created sticker" do
    get '/v1/stickers'
    
    assert_response :success
    
    stickers = JSON.parse(@response.body)
    assert_equal 1, stickers.count
    assert_equal "TestString", stickers[0]["photo_id"]
  end
end
