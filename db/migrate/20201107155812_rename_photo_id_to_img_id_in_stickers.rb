class RenamePhotoIdToImgIdInStickers < ActiveRecord::Migration[6.0]
  def change
    change_table :stickers do |t|
      t.rename :photo_id, :img_id
    end
  end
end
