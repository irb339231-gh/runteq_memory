# app/models/image.rb
class Image < ApplicationRecord
  belongs_to :memory
  mount_uploader :image, ImageUploader
end