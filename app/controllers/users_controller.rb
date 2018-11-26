class UsersController < ApiController
  before_action :require_login, except: [:create]

  # wrap_parameters :user, include: [:name, :email, :password]

  def create
    user = User.create!(user_params)
    render json: { token: user.auth_token }
  end

  def profile
    user = User.find_by_auth_token!(request.headers[:token])
    render json: { user: { email: user.email, name: user.name } }
  end

  private

  def user_params
    params.permit(:email, :name, :password)
  end

end
