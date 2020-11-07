class V1::ImgurApiWrapperController < ApplicationController
  include V1::ImgurApiWrapperHelper
  protect_from_forgery with: :null_session
  
  def index
    imgur_client = ImgurApiWrapper::Client.new()
    
    if(id = params[:img_id])
      handleRequest(imgur_client.image(id), 'Could not get image')
    else
      handleRequest(imgur_client.search_image("nature"), 'Could not get image')
    end
  end
  
  def search
    imgur_client = ImgurApiWrapper::Client.new()
    query = params.require(:query)
    handleRequest(imgur_client.search_image(query), 'Imgur returned an error')
  end
end
