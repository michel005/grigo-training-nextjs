export interface TrainingType {
    id?: string
    start_date?: string
    end_date?: string
    name?: string
    status?: 'ACTIVE' | 'COMPLETED' | 'ARCHIVED'
    muscle_group?: string
}
