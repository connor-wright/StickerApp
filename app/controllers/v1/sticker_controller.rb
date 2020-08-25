class V1::StickerController < ApplicationController
  
  def create
    #TODO add a filter for params
    @sticker = Sticker.new(sticker_params)
    #TODO add error checking
    @sticker.save
  end
  
  def index
    render :json => @stickers = Sticker.all
  end
  
  private
  
  def sticker_params
    params.permit(:id, :xpos, :ypos)
  end
end
