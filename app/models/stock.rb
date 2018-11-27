class Stock < ApplicationRecord
  belongs_to :user

  URL = "https://api.iextrading.com/1.0"
end
