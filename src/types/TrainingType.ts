import PaginationType from '@/types/PaginationType'

export interface TrainingType extends PaginationType {
    id?: number
    startDate?: string
    endDate?: string
    exercises: []
    executions: []
    progress?: number
}
