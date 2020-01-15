class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.string :image
      t.text :text
      t.references :user, foregin_key: true
      t.references :group, foregin_key: true
      t.timestamps
    end
  end
end
