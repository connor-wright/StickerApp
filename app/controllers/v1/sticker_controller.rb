class V1::StickerController < ApplicationController
  #TODO when adding login check for session
  skip_before_action :verify_authenticity_token
  
  def create
    logger.debug "Processing request #{sticker_params}"
    logger.info  "Processing create sticker..."
    
    @sticker = Sticker.new(sticker_params)
    
    if @sticker.save
      logger.info "Added sticker"
      render status: 200, :json => @sticker
    else
      logger.info "Failed to add sticker"
      render status: 400, :json =>  {:message => "Failed to add sticker"}
    end
  end
  
  def index
    render :json => @stickers = Sticker.all
  end
  
  private
  
  def sticker_params
    params.require(:photo).permit(:photo_id, :xpos, :ypos, :artist, :url)
  end
end
