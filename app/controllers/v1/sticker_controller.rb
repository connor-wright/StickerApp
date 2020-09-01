class V1::StickerController < ApplicationController
  #TODO when adding login check for session
  skip_before_action :verify_authenticity_token
  
  def create
    puts params
    @sticker = Sticker.new(sticker_params)
    #TODO add error checking
    @sticker.save
  end
  
  def index
    render :json => @stickers = Sticker.all
  end
  
  private
  
  def sticker_params
    params.permit(:photo_id, :xpos, :ypos)
  end
end
