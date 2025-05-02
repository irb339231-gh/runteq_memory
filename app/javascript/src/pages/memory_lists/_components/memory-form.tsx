import React from 'react'
import { MemoryFormData } from '../../../types/memory'

type MemoryFormProps = {
  formData: Partial<MemoryFormData>
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  id?: string
}

export default function MemoryForm({
  formData,
  onChange,
  onSubmit,
  onFileChange,
  error,
  id,
}: MemoryFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="my-8 w-full rounded-lg bg-white px-6 py-8 shadow-md"
    >
      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
      <div className="mb-4">
        <label
          htmlFor="title"
          className="mb-2 block font-semibold text-gray-700"
        >
          タイトル
        </label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title ?? ''}
          onChange={onChange}
          className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="body"
          className="mb-2 block font-semibold text-gray-700"
        >
          説明
        </label>
        <textarea
          id="body"
          name="body"
          value={formData.body ?? ''}
          onChange={onChange}
          className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="public_flag"
          className="mb-2 block font-semibold text-gray-700"
        >
          公開設定
        </label>
        <input
          id="public_flag"
          type="checkbox"
          name="public_flag"
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          checked={formData.public_flag ?? false}
          onChange={onChange}
        />
        <label htmlFor="public_flag" className="ml-2">
          公開する
        </label>
      </div>
      <div className="mb-4">
        <label
          htmlFor="image"
          className="mb-2 block font-semibold text-gray-700"
        >
          画像
        </label>
        {(formData.image || formData.image_url) && (
          <img
            src={
              formData.image
                ? URL.createObjectURL(formData.image)
                : formData.image_url!
            }
            alt="Preview"
            className="mb-4 h-32 w-32 object-cover"
          />
        )}
        <input
          id="image"
          type="file"
          name="image"
          accept="image/*"
          onChange={onFileChange}
          className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-md bg-blue-600 py-3 text-white transition duration-200 hover:bg-blue-700"
      >
        {id ? '更新する' : '作成する'}
      </button>
    </form>
  )
}
