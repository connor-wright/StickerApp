require 'test_helper'

class V1::ImgurApiWrapperControllerTest < ActionDispatch::IntegrationTest
  test "imgur api wrapper should return valid json" do
    get '/v1/imgur_api'
    assert_response :success
    assert_nothing_raised {JSON.parse(response.body)}
  end
  
  test "Can search from the imgur api" do 
    get '/v1/imgur_api/search/taco'
    assert_response :success
    #for now just check the body returns an object with photos
    actual_response = JSON.parse(response.body)
    assert_not actual_response.empty?
    assert actual_response.has_key?('data')
  end
end
