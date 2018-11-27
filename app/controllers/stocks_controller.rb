class StocksController < ApplicationController

  def getStockInfo
    @data = Stock.getStockQuote(params[:id])
    render json: @data
  end

  def getBatchInfo
    @data = Stock.getBatchQuote(params[:id])
    render json: @data
  end

  def getBatchPricesOnly
    @data = Stock.getBatchPrice(params[:id])
    render json: @data
  end

end
