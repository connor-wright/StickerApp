require 'test_helper'

class StaticControllerTest < ActionDispatch::IntegrationTest
  test "Should get landing page" do
    get root_path
    assert_response :success 
  end
end
