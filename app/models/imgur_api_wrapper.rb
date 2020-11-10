#A module used to wrap the imgur api client calls

#based off here https://www.nopio.com/blog/how-to-create-an-api-wrapper-of-an-external-service-in-rails/

module ImgurApiWrapper
  
  class Client
    API_ENDPOINT = 'https://api.imgur.com/3/'
    CLIENT_ID    = ENV['IMGUR_CLIENT_ID']
    
    def search_image(query)
      request(http_method: :get, endpoint: "gallery/search/?q=#{query}")
    end
    
    def image(image_hash)
      request(http_method: :get, endpoint: "image/#{image_hash}");
    end
    
    private
    
    def client
      @_client ||= Faraday.new(API_ENDPOINT) do |client|
        client.request :url_encoded
        client.adapter Faraday.default_adapter
        client.headers['Authorization'] = "Client-ID #{CLIENT_ID}"
      end
    end
    
    def request(http_method:, endpoint:, params: {})
      return client.public_send(http_method, endpoint, params)
    end
  end
end