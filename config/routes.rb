Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  post "/login" => "sessions#create"
  delete "/logout" => "sessions#destroy"
  get "/profile" => "users#profile"
  resources :users

  get "/stockquote/:id" => "stocks#getStockInfo"
  get "/batchquote/:id" => "stocks#getBatchInfo"
  get "/batchprice/:id" => "stocks#getBatchPricesOnly"

  post "/makeTransaction" => "users#doTransaction"
end
