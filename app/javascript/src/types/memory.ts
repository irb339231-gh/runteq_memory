export type Memory = {
  id: number
  title: string
  body: string
  public_flag: boolean
  created_at: string
  user_name: string
  image_url?: string
  user_id: number
}

export type MemoryFormData = {
  title: string
  body: string
  public_flag: boolean
  images?: File[]
  image_url?: string
}
