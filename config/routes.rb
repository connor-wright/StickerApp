Rails.application.routes.draw do
  root 'static#index'
  #setup routes for the API
  namespace :v1, defaults: {format:'json'} do
    get 'api',        to: 'api#index'
    get 'pexels_api', to: 'pexels_api_wrapper#index'
  end
end
