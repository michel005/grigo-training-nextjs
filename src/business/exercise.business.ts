import { AbstractBusiness } from '@/business/abstract.business'
import { ExerciseType } from '@/types/exercise.type'
import { API } from '@/settings/axios.settings'
import { SessionUtils } from '@/utils/session.utils'

export class ExerciseBusiness extends AbstractBusiness<ExerciseType> {
    constructor() {
        super('exercise')
    }

    public byTraining = async ({ trainingId }: { trainingId: number }) => {
        const response = await API.get(
            `/exercise/all?trainingId=${trainingId}`,
            SessionUtils.tokenHeader()
        )

        return response.data as ExerciseType[]
    }
}
