class Memory < ApplicationRecord
  mount_uploader :image, ImageUploader
  belongs_to :user
  has_many :images, dependent: :destroy #追加

  validates :title, presence: true
  validates :body, presence: true
  validates :public_flag, inclusion: { in: [ true, false ] }

  scope :public_memories, -> { where(public_flag: true) }
end
