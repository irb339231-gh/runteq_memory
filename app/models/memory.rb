# app/models/memory.rb
class Memory < ApplicationRecord
  belongs_to :user
  has_many :images, dependent: :destroy  # mount_uploaderは削除

  validates :title, presence: true
  validates :body, presence: true
  validates :public_flag, inclusion: { in: [true, false] }

  scope :public_memories, -> { where(public_flag: true) }
end