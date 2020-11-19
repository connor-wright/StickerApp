require 'test_helper'
#TODO test requires imgur being up need to mock this connectin
class V1::ImgurApiWrapperControllerTest < ActionDispatch::IntegrationTest
  test "imgur api wrapper should return valid json" do
    get '/v1/imgur_api'
    assert_nothing_raised {JSON.parse(response.body)}
  end
  
  test "Can search from the imgur api" do 
    get '/v1/imgur_api/search/taco'
    #for now just check the body returns an object
    assert_nothing_raised {JSON.parse(response.body)}
  end
end
