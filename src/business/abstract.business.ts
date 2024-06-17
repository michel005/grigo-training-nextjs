import { API } from '@/settings/axios.settings'
import { SessionUtils } from '@/utils/session.utils'
import { PaginationType } from '@/types/pagination.type'

export abstract class AbstractBusiness<T> {
    private entityName: string

    constructor(entityName: string) {
        this.entityName = entityName
    }

    public create = async ({ entity }: { entity: T }) => {
        const response = await API.post(
            `/${this.entityName}`,
            entity,
            SessionUtils.tokenHeader()
        )
        return response.data
    }

    public update = async ({ id, entity }: { id: string; entity: T }) => {
        const response = await API.put(
            `/${this.entityName}?id=${id}`,
            entity,
            SessionUtils.tokenHeader()
        )
        return response.data
    }

    public remove = async ({ id }: { id?: string }) => {
        await API.delete(
            `/${this.entityName}?id=${id}`,
            SessionUtils.tokenHeader()
        )
    }

    public findById = async ({ id }: { id: string }) => {
        const reponse = await API.get(
            `/${this.entityName}/byId?id=${id}`,
            SessionUtils.tokenHeader()
        )
        return reponse.data
    }

    public findAll = async (
        {
            pagination = {
                current: 0,
                size: 10,
                sortDirection: 'ASC',
                sortField: 'id',
            },
        }: {
            pagination?: Omit<PaginationType<T>, 'data'>
        } = {
            pagination: {
                current: 0,
                size: 10,
                sortDirection: 'ASC',
                sortField: 'id',
            },
        }
    ) => {
        const reponse = await API.get(
            `/${this.entityName}/all?current=${pagination.current}&size=${pagination.size}&sortField=${pagination.sortField}&sortDirection=${pagination.sortDirection}`,
            SessionUtils.tokenHeader()
        )
        return reponse.data
    }
}
