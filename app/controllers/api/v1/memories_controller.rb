class Api::V1::MemoriesController < ApplicationController
  before_action :authenticate_user!

  def index
    memories = Memory.public_memories.includes(:user, :images)
    render json: memories.map { |memory|
      {
        id: memory.id,
        title: memory.title,
        body: memory.body,
        created_at: memory.created_at,
        user_name: memory.user.name,
        image_urls: memory.images.map { |img| img.image.url }  # 複数画像に変更
      }
    }, status: :ok
  end

  def show
    memory = Memory.find(params[:id])
    if !memory.public_flag && memory.user.id != current_user.id
      render json: { error: "この思い出を閲覧する権限がありません" }, status: :forbidden
      return
    end

    render json: {
      id: memory.id,
      title: memory.title,
      body: memory.body,
      public_flag: memory.public_flag,
      created_at: memory.created_at,
      user_name: memory.user.name,
      image_urls: memory.images.map { |img| img.image.url },  # 複数画像に変更
      user_id: memory.user.id
    }, status: :ok
  end

  def create
    memory = current_user.memories.new(memory_params)
    if memory.save
      params[:images]&.each do |image|  # 複数画像を保存
        memory.images.create(image: image)
      end
      render json: { message: "思い出が作成されました" }, status: :ok
    else
      render json: { error: memory.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    memory = current_user.memories.find_by(id: params[:id])
    if memory.nil? || memory.user_id != current_user.id
      render json: { error: "この思い出を更新する権限がありません" }, status: :forbidden
      return
    end

    if memory.update(memory_params)
      memory.images.destroy_all  # 既存画像を削除
      params[:images]&.each do |image|  # 新しい画像を保存
        memory.images.create(image: image)
      end
      render json: { message: "思い出が更新されました" }, status: :ok
    else
      render json: { error: memory.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    memory = current_user.memories.find_by(id: params[:id])

    if memory.nil?
      render json: { error: "思い出が見つかりませんでした" }, status: :not_found
      return
    end

    if memory.destroy
      render json: { message: "思い出が削除されました" }, status: :ok
    else
      render json: { error: "思い出の削除に失敗しました" }, status: :unprocessable_entity
    end
  end

  private

  def memory_params
    params.require(:memory).permit(:title, :body, :public_flag)  # imageは削除
  end
end