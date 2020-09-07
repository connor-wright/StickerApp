
class V1::PexelsApiWrapperController < ApplicationController
  protect_from_forgery with: :null_session
  def index
    
    pexels_client = PexelsApiWrapper::Client.new()
    
    if(id = params[:photo_id])
      render :json => pexels_client.image(id)
    else
      render :json => pexels_client.search_image("nature")
    end
  end
end
