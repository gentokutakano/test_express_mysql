export interface getUsersResponse {
  id: number
  name: string
  age: number
  created_at: string
  updated_at: string
}

export interface getPostsResponse {
  id: number
  user_id: number
  message: string
  created_at: string
  updated_at: string
}
