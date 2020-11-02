class RemoveArtistFromStickers < ActiveRecord::Migration[6.0]
  def change
    remove_column :stickers, :artist, :string
  end
end
