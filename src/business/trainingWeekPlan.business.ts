import { AbstractBusiness } from '@/business/abstract.business'
import { TrainingWeekPlanType } from '@/types/trainingWeekPlan.type'
import { API } from '@/settings/axios.settings'
import { SessionUtils } from '@/utils/session.utils'

export class TrainingWeekPlanBusiness extends AbstractBusiness<TrainingWeekPlanType> {
    constructor() {
        super('training_week_plan')
    }

    public save = async ({ entity }: { entity: TrainingWeekPlanType }) => {
        const response = (
            await API.get('/training_week_plan', SessionUtils.tokenHeader())
        ).data
        if (!!response?.id) {
            await this.update({ id: response?.id, entity })
        } else {
            await this.create({ entity })
        }
    }

    public complete = async () => {
        await API.post(
            '/training_week_plan/complete',
            null,
            SessionUtils.tokenHeader()
        )
    }
}
