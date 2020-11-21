interface Meta {
  version: number
  records: number
  pages?: number
  per_page?: number
}

export interface BaseResponse<T> {
  data: T
  meta: Meta
  error: {
    code: number
    message: string
  }
}
