export default interface PaginationType {
    current?: number
    size?: number
    sortField?: string
    sortDirection?: 'ASC' | 'DESC'
}
