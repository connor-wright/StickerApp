module V1::ImgurApiWrapperHelper
  
  def handleRequest(response, errorMsg)
    if(response.status == 200)
      render :json => response.body
      
    else
      render json: 
      {
        :error => errorMsg
      }.to_json, :status => response.status
    end
    
  rescue JSON::ParserError 
      render json: 
      {
        #todo figure out if this is a good way to return errors
        :error => 'Response was not valid json'
      }.to_json, :status => 500
  end
end
