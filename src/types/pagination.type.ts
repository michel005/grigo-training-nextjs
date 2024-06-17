export interface PaginationType<T> {
    current: number
    size: number
    sortField?: string
    sortDirection?: 'ASC' | 'DESC'
    data: T
}
