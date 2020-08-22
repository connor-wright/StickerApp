#TODO move most of the complexity into a module way too much here

class V1::PexelsApiWrapperController < ApplicationController
  API_ENDPOINT = 'https://api.pexels.com/v1/'
  API_KEY      = ENV['pexels_api_key']
  
  def index
    @_client = Faraday.new(API_ENDPOINT) do |client|
      client.request :url_encoded
      client.adapter Faraday.default_adapter
      client.headers['Authorization'] = "#{API_KEY}"
    end
    
    response = @_client.public_send(:get, 'curated?per_page=10', {})
    render json: response.body
  end
end
