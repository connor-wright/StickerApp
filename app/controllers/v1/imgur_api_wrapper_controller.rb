class V1::ImgurApiWrapperController < ApplicationController
  protect_from_forgery with: :null_session
  
  def index
    
    pexels_client = ImgurApiWrapper::Client.new()
    
    if(id = params[:img_id])
      render :json => pexels_client.image(id)
    else
      render :json => pexels_client.search_image("nature")
    end
  end
  
  def search
    pexels_client = ImgurApiWrapper::Client.new()
    query = params.require(:query)
    render :json => pexels_client.search_image(query)
  end
end
