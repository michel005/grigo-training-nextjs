import { AbstractBusiness } from '@/business/abstract.business'
import { ExerciseType } from '@/types/exercise.type'

export class ExerciseBusiness extends AbstractBusiness<ExerciseType> {
    constructor() {
        super('exercise')
    }
}
