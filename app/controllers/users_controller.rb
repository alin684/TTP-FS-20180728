class UsersController < ApiController
  before_action :require_login, except: [:create]

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

  def doTransaction
    user = User.find_by_auth_token!(request.headers[:token])
    if user.makeTransaction(params[:transaction])
      user.reload
      render json: {
        email: user.email,
        name: user.name,
        money: user.money,
        stocks: user.stocks
      }
    end
  end
  
  private

  def user_params
    params.require(:user).permit(:email, :name, :password)
  end

end
