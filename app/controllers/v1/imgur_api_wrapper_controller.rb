class V1::ImgurApiWrapperController < ApplicationController
  protect_from_forgery with: :null_session
  
  def index
    
    imgur_client = ImgurApiWrapper::Client.new()
    
    if(id = params[:img_id])
      render :json => imgur_client.image(id)
    else
      render :json => imgur_client.search_image("nature")
    end
  end
  
  def search
    imgur_client = ImgurApiWrapper::Client.new()
    query = params.require(:query)
    response = imgur_client.search_image(query)
    if(response.status == 200)
      render :json => response.body
    else 
      render json: 
      {
        :error => 'Imgur returned an error'
      }.to_json, :status => response.status, :error => "internal-server-error"
    end
  end
end
