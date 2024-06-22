import { ExerciseType } from '@/types/exercise.type'

export interface TrainingType {
    id?: string
    name?: string
    status?: 'ACTIVE' | 'COMPLETED' | 'ARCHIVED'
    muscle_group?: string
    exercise?: ExerciseType[]
}
