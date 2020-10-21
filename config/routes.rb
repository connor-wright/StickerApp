Rails.application.routes.draw do
  root 'static#index'
  #setup routes for the API
  namespace :v1, defaults: {format:'json'} do
    get   'api',                      to: 'api#index'
    get   'imgur_api',               to: 'imgur_api_wrapper#index'
    get   'imgur_api/search/:query', to: 'imgur_api_wrapper#search'
    get   'imgur_api/sticker/:id',   to: 'imgur_api_wrapper#index'
    
    get   'stickers',                 to: 'sticker#index'
    post  'sticker/',                 to: 'sticker#create'
  end
end
