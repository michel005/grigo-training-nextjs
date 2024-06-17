import { TrainingBusiness } from '@/business/training.business'
import { ExerciseBusiness } from '@/business/exercise.business'

export const Business = {
    training: new TrainingBusiness(),
    exercise: new ExerciseBusiness(),
}
