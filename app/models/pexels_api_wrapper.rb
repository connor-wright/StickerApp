#A module used to wrap the Pexels api client calls

#based off here https://www.nopio.com/blog/how-to-create-an-api-wrapper-of-an-external-service-in-rails/

module PexelsApiWrapper
  
  class Client
    API_ENDPOINT = 'https://api.pexels.com/v1/'
    API_KEY      = ENV['pexels_api_key']
    
    def curated_image()
      request(http_method: :get, endpoint: 'curated?per_page=1')
    end
    
    def search_image(keyword)
      request(http_method: :get, endpoint: "search?query=#{keyword}&per_page=1")
    end
    
    def image(photo_id)
      request(http_method: :get, endpoint: "/photos/#{photo_id}");
    end
    
    private
    
    def client
      @_client ||= Faraday.new(API_ENDPOINT) do |client|
        client.request :url_encoded
        client.adapter Faraday.default_adapter
        client.headers['Authorization'] = "#{API_KEY}"
      end
    end
    
    def request(http_method:, endpoint:, params: {})
      response = client.public_send(http_method, endpoint, params)
      return response.body
    end
  end
  
end