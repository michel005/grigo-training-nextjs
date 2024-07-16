import { AbstractBusiness } from '@/business/abstract.business'
import { ExerciseType } from '@/types/exercise.type'

export class ExerciseBusiness extends AbstractBusiness<ExerciseType> {
    constructor() {
        super('exercise')
    }

    public parseCreate = async ({ entity }: any) => {
        return {
            name: entity?.name,
            type: entity?.type,
            training_id: entity?.training_id,
            exercise_time: entity?.exercise_time,
            execution_order: entity?.execution_order,
            rest_time: entity?.rest_time,
            series: entity?.series,
            repetitions: entity?.repetitions,
            drops: entity?.drops,
            observation: entity?.observation,
        }
    }

    public parseUpdate = async ({ entity }: any) => {
        return {
            name: entity?.name,
            type: entity?.type,
            training_id: entity?.training_id,
            exercise_time: entity?.exercise_time,
            execution_order: entity?.execution_order,
            rest_time: entity?.rest_time,
            series: entity?.series,
            repetitions: entity?.repetitions,
            drops: entity?.drops,
            observation: entity?.observation,
        }
    }
}
