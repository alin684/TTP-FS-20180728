require 'bigdecimal';

class User < ApplicationRecord

  has_secure_password
  has_secure_token :auth_token
  validates :email, uniqueness: true

  has_many :stocks
  has_many :transactions

  def invalidate_token
    self.update_columns(auth_token: nil)
  end

  def self.validate_login(email, password)
    user = find_by(email: email)
    if user && user.authenticate(password)
      user
    end
  end

  def makeTransaction(transaction)
    valid = false;
    newMoney = self.money - (transaction[:shares].to_i * transaction[:price].to_f);
    if newMoney > 0
      valid = true;
    end
    newTransaction = Transaction.new(user:self, ticker:transaction[:ticker], shares:transaction[:shares])

    if(valid && newTransaction)
      newTransaction.save;
      self.update_attribute(:money, newMoney);

      existingStock = self.stocks.find(|stock| stock.ticker == newTransaction[:ticker]);
      if existingStock
        existingStock.shares += newTransaction[:shares]
        existingStock.save;
      else
        newStock = Stock.new(user:self, ticker:newTransaction.ticker, shares:newTransaction.shares);
        if newStock
          newStock.save;
        else
          return false;
        end
      end
      return true;
    else
      return false;
    end
  end

end
