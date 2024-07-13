import { AbstractBusiness } from '@/business/abstract.business'
import { ExerciseType } from '@/types/exercise.type'
import { API } from '@/settings/axios.settings'
import { SessionUtils } from '@/utils/session.utils'
import { ExecutionType } from '@/types/execution.type'

export class ExecutionBusiness extends AbstractBusiness<ExecutionType> {
    constructor() {
        super('execution')
    }

    public executionPlan = async ({ exerciseId }: { exerciseId: string }) => {
        const response = await API.get(
            `/execution/executionPlan?id=${exerciseId}`,
            SessionUtils.tokenHeader()
        )

        return response.data
    }
}
