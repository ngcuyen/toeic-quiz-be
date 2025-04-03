export type PaginationType<T> = {
  items: T[]
  page: number
  per_page: number
  total_pages: number
  total_items: number
}
