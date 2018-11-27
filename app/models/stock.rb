class Stock < ApplicationRecord
  belongs_to :user

  URL = "https://api.iextrading.com/1.0/"

  def self.getStockQuote(ticker)
    RestClient.get("#{URL}stock/#{ticker}/quote"){|res|
      case res.code
      when 200
        return data = JSON.parse(res.body)
      else
        return {status:"Error", head:404}
      end
    }
  end

  def self.getBatchQuote(tickers)
    RestClient.get("#{URL}stock/market/batch?symbols=#{tickers}&types=quote"){|res|
      case res.code
      when 200
        return data = JSON.parse(res.body)
      else
        return {status:"Error", head:404}
      end
    }
  end

  def self.getBatchPrice(tickers)
    RestClient.get("#{URL}stock/market/batch?symbols=#{tickers}&types=price"){|res|
      case res.code
      when 200
        return data = JSON.parse(res.body)
      else
        return {status:"Error", head:404}
      end
    }
  end

end
