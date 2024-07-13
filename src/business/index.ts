import { TrainingBusiness } from '@/business/training.business'
import { ExerciseBusiness } from '@/business/exercise.business'
import { TrainingWeekPlanBusiness } from '@/business/trainingWeekPlan.business'
import { ExecutionBusiness } from '@/business/execution.business'

export const Business = {
    training: new TrainingBusiness(),
    trainingWeekPlan: new TrainingWeekPlanBusiness(),
    exercise: new ExerciseBusiness(),
    execution: new ExecutionBusiness(),
}
