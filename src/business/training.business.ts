import { AbstractBusiness } from '@/business/abstract.business'
import { TrainingType } from '@/types/training.type'
import { API } from '@/settings/axios.settings'
import { SessionUtils } from '@/utils/session.utils'
import { TrainingPageType } from '@/types/trainingPage.type'

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

    public duplicate = async ({ id }: { id?: string }) => {
        await API.post(
            `/training/duplicate?id=${id}`,
            null,
            SessionUtils.tokenHeader()
        )
    }

    public archive = async ({ id }: { id?: string }) => {
        await API.put(
            `/training/archive?id=${id}`,
            null,
            SessionUtils.tokenHeader()
        )
    }

    public complete = async ({ id }: { id?: string }) => {
        await API.put(
            `/training/complete?id=${id}`,
            null,
            SessionUtils.tokenHeader()
        )
    }

    public reopen = async ({ id }: { id?: string }) => {
        await API.put(
            `/training/active?id=${id}`,
            null,
            SessionUtils.tokenHeader()
        )
    }

    public page = async (): Promise<TrainingPageType> => {
        return (await API.get(`/training/page`, SessionUtils.tokenHeader()))
            .data
    }
}
