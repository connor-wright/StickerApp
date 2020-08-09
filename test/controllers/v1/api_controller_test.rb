require 'test_helper'

class V1::ApiControllerTest < ActionDispatch::IntegrationTest
  test "api should return guid" do
    get '/v1/api'
    assert_response :success
    response_json = JSON.parse(response.body)
    assert_equal 'b64a02b4-3cd7-4373-aa9c-4264709f711b', response_json['api'][0]['guid']
  end
end
