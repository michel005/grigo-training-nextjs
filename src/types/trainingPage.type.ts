import { TrainingWeekPlanExpandedType } from '@/types/trainingWeekPlan.expanded.type'
import { TrainingType } from '@/types/training.type'

export interface TrainingPageType {
    weekPlan: TrainingWeekPlanExpandedType
    activeTrainings: TrainingType[]
    archivedTrainings: TrainingType[]
    completedTrainings: TrainingType[]
}
