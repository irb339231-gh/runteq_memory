// app/javascript/src/types/memory.ts

export type Memory = {
  id: number
  title: string
  body: string
  public_flag: boolean
  created_at: string
  user_name: string
  image_urls?: string[]  // image_url → image_urls に変更
  user_id: number
}

export type MemoryFormData = {
  title: string
  body: string
  public_flag: boolean
  images?: File[]
  image_urls?: string[]  // image_url → image_urls に変更
}