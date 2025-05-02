import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MemoryFormData } from '../../../types/memory'
import { createMemory } from '../_hooks/createMemory'
import MemoryForm from '../_components/memory-form'

const MemoryCreatePage = () => {
  const [formData, setFormData] = useState<Partial<MemoryFormData>>({
    title: '',
    body: '',
    public_flag: false,
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({
        ...formData,
        image: file,
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await createMemory(formData)
      navigate('/memories')
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('不明なエラーが発生しました')
      }
    }
  }

  return (
    <div className="mx-auto my-16 max-w-[720px]">
      <h1 className="text-3xl font-bold">新規思い出作成</h1>
      <MemoryForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onFileChange={handleFileChange}
        error={error}
      />
      <div className="mt-4">
        <Link
          to="/memories"
          className="inline-block rounded-md bg-gray-600 px-5 py-3 text-white transition-colors duration-300 hover:bg-gray-500"
        >
          前の画面に戻る
        </Link>
      </div>
    </div>
  )
}

export default MemoryCreatePage
