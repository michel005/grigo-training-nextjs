import { AbstractBusiness } from '@/business/abstract.business'
import { TrainingType } from '@/types/training.type'
import { API } from '@/settings/axios.settings'
import { SessionUtils } from '@/utils/session.utils'

export class TrainingBusiness extends AbstractBusiness<TrainingType> {
    constructor() {
        super('training')
    }

    public findAll = async () => {
        const reponse = await API.get(
            `/training/all`,
            SessionUtils.tokenHeader()
        )
        return reponse.data
    }
}
