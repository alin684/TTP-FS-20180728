class UsersController < ApiController
  before_action :require_login, except: [:create, :buy]

  # wrap_parameters :user, include: [:name, :email, :password]

  def create
    user = User.create!(user_params)
    render json: { token: user.auth_token }
  end

  def profile
    user = User.find_by_auth_token!(request.headers[:token])
    render json: {
      email: user.email,
      name: user.name,
      money: user.money,
      stocks: user.stocks
    }
  end

  def buy
    user = User.find_by_auth_token!(request.headers[:token])
    if user.buyStock(params)
      user.reload
      render json: {
        email: user.email,
        name: user.name,
        money: user.money,
        stocks: user.stocks
      }
    end
  end

  def transactionHistory
    user = User.find_by_auth_token!(request.headers[:token])
    render json: {
      email: user.email,
      name: user.name,
      money: user.money,
      stocks: user.stocks,
      transactions: user.transactions,
    }
  end

  private

  def user_params
    params.require(:user).permit(:email, :name, :password)
  end

end
