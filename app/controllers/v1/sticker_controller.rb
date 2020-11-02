class V1::StickerController < ApplicationController
  #TODO when adding login check for session
  skip_before_action :verify_authenticity_token
  
  def create
    logger.debug "Processing request #{sticker_params}"
    logger.info  "Processing create sticker..."
    
    @sticker = Sticker.new(sticker_params)
    
    if @sticker.save
      logger.info "Added sticker"
      render status: 200, :json => Sticker.select(select_params).find(@sticker.id)
    else
      logger.info "Failed to add sticker"
      render status: 400, :json =>  {:message => "Failed to add sticker"}
    end
  end
  
  def index
    render :json => @stickers = Sticker.all.select(select_params)
  end
  
  private
  
  def sticker_params
    params.require(:photo).permit(:photo_id, :xpos, :ypos, :url)
  end
  
  def select_params()
    [:id, :photo_id, :xpos, :ypos, :url]
  end
end
