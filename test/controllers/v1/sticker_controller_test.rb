require 'test_helper'

class V1::StickerControllerTest < ActionDispatch::IntegrationTest
  test "should be able to create a sticker" do
    expectedImgId = 'asdf'
    
    post '/v1/sticker',
      params: {sticker:{
                img_id: expectedImgId,
                xpos: '0',
                ypos: '0',
                url: 'https:\\whater.org'
              }}
    
    assert_response :success
    
    #check we get back the same sticker we created
    sticker = JSON.parse(@response.body)
    assert_equal expectedImgId, sticker['img_id']
  end
  
  test "should be able to retrieve created sticker" do
    get '/v1/stickers'
    
    assert_response :success
    
    stickers = JSON.parse(@response.body)
    assert_equal 1, stickers.count
    assert_equal "TestString", stickers[0]["img_id"]
  end
  
  test "should be able to create and retrieve sticker" do 
    expectedImgId = 'photo id 1'
    expectedXpos     = 45
    expectedYpos     = 76
    expectedUrl      = 'https:\\whatever.org'
    
    post '/v1/sticker',
      params: {sticker: {
                img_id: expectedImgId, 
                xpos:     expectedXpos, 
                ypos:     expectedYpos,
                url:      expectedUrl,
              }}
    
    assert_response :success
    
    get '/v1/stickers'
    assert_response :success
    
    stickers = JSON.parse(@response.body)
    sticker = stickers.find { |sticker| sticker['img_id'] == expectedImgId}
    
    assert_equal expectedXpos,   sticker['xpos']
    assert_equal expectedYpos,   sticker['ypos']
    assert_equal expectedUrl,    sticker['url']
  end
  
  test "Should only return public data" do
    get '/v1/stickers'
    assert_response :success
    
    stickers = JSON.parse(@response.body)[0]
    expected_values = ["id", "img_id", "xpos", "ypos", "url"].to_s
    actual_values   = stickers.keys.to_s
    assert_equal expected_values, actual_values
  end
end
