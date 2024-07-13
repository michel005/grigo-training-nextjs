import { TrainingType } from '@/types/training.type'
import { ExerciseType } from '@/types/exercise.type'

export interface ExecutionType {
    id?: string
    date_time?: bigint
    training: TrainingType
    exercise: ExerciseType
    serie_count?: number
    drop_count?: number
    repetition_count?: number
    weight?: number
    execution_time?: number
}
