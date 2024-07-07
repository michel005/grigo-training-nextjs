import { TrainingType } from '@/types/training.type'

export interface TrainingWeekPlanExpandedType {
    id?: string
    weekday_1?: TrainingType | null
    weekday_2?: TrainingType | null
    weekday_3?: TrainingType | null
    weekday_4?: TrainingType | null
    weekday_5?: TrainingType | null
    weekday_6?: TrainingType | null
    weekday_7?: TrainingType | null
}
