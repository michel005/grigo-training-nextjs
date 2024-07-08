import { TrainingBusiness } from '@/business/training.business'
import { ExerciseBusiness } from '@/business/exercise.business'
import { TrainingWeekPlanBusiness } from '@/business/trainingWeekPlan.business'

export const Business = {
    training: new TrainingBusiness(),
    trainingWeekPlan: new TrainingWeekPlanBusiness(),
    exercise: new ExerciseBusiness(),
}
