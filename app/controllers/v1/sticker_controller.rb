class V1::StickerController < ApplicationController
  #TODO when adding login check for session
  skip_before_action :verify_authenticity_token
  
  def create
    puts sticker_params
    @sticker = Sticker.new(sticker_params)
    #TODO add error checking
    if @sticker.save
      render status: 200, :json => "Successfuly added sticker"
    else
      render status: 400, :json => "Failed to add sticker"
    end
  end
  
  def index
    render :json => @stickers = Sticker.all
  end
  
  private
  
  def sticker_params
    params.require(:photo).permit(:photo_id, :xpos, :ypos)
  end
end
