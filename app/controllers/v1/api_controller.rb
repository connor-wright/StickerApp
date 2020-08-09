class V1::ApiController < ApplicationController
  def index
    render json: { :api => [
      {
        :name => 'api-placeholder',
        :guid => 'b64a02b4-3cd7-4373-aa9c-4264709f711b'
      }
    ]}.to_json
  end
end
