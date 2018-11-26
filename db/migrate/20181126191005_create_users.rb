class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :email
      t.string :name
      t.string :password_digest
      t.string :auth_token
      t.decimal :balance, precision: 10, scale: 2, default: 5000

      t.timestamps
    end
  end
end
