require 'test_helper'

class V1::PexelsApiWrapperControllerTest < ActionDispatch::IntegrationTest
  test "pexels api wrapper should return valid json" do
    get '/v1/pexels_api'
    assert_response :success
    assert_nothing_raised {JSON.parse(response.body)}
  end
end
