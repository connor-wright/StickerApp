class CreateStickers < ActiveRecord::Migration[6.0]
  def change
    create_table :stickers do |t|
      t.string :photo_id
      t.integer :xpos
      t.integer :ypos

      t.timestamps
    end
  end
end
