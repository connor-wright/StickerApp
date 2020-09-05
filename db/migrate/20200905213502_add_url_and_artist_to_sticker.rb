class AddUrlAndArtistToSticker < ActiveRecord::Migration[6.0]
  def change
    add_column :stickers, :artist, :string
    add_column :stickers, :url, :string
  end
end
