Rails.application.routes.draw do
  root 'static#index'
  #setup routes for the API
  namespace :v1, defaults: {format:'json'} do
    get   'api',                      to: 'api#index'
    get   'pexels_api',               to: 'pexels_api_wrapper#index'
    get   'pexels_api/sticker/:id',   to: 'pexels_api_wrapper#index'
    
    get   'stickers',                 to: 'sticker#index'
    post  'sticker',                  to: 'sticker#create'
  end
end
