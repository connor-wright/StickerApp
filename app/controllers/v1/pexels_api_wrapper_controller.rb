
class V1::PexelsApiWrapperController < ApplicationController
  
  def index
    pexels_client = PexelsApiWrapper::Client.new()
    render :json => pexels_client.curated_image()
  end
end
