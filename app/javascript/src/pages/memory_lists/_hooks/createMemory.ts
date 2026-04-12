// app/javascript/src/pages/memory_lists/_hooks/createMemory.ts
import { MemoryFormData } from '../../../types/memory'
import { getCSRFToken } from '../../../utils/csrf'

export const createMemory = async (data: Partial<MemoryFormData>) => {
  const formData = new FormData()
  formData.append('memory[title]', data.title || '')
  formData.append('memory[body]', data.body || '')
  formData.append('memory[public_flag]', String(data.public_flag || false))

  // 複数画像を images[] として送る
  data.images?.forEach((file) => {
    formData.append('images[]', file)
  })

  const res = await fetch('/api/v1/memories', {
    method: 'POST',
    headers: {
      'X-CSRF-Token': getCSRFToken(),
    },
    credentials: 'include',
    body: formData,
  })

  const json = await res.json()

  if (!res.ok) {
    throw new Error(json?.error || '作成に失敗しました')
  }

  return json
}