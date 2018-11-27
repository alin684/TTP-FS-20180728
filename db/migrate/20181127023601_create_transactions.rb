class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.string :ticker
      t.decimal :price
      t.integer :shares

      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
