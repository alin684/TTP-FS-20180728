class User < ApplicationRecord

  has_secure_password
  has_secure_token :auth_token
  validates_uniqueness_of :email
  validates :password, presence: true

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

end
