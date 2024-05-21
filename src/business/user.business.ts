import Business from '@/business/business'
import { UserType } from '@/types/UserType'
import { AxiosResponse } from 'axios'

export default class UserBusiness extends Business {
    static login = async ({
        user_name,
        password,
    }: {
        user_name: string
        password: string
    }) => {
        try {
            const result: AxiosResponse<{
                user: UserType
                token: string
            }> = await this.axiosInstance.post('/user/login', {
                user_name,
                password,
            })
            return result.data
        } catch (error: any) {
            throw error?.response?.data
        }
    }

    static create = async ({ user }: { user: UserType }) => {
        try {
            await this.axiosInstance.post('/user', user)
        } catch (error: any) {
            throw error?.response?.data
        }
    }

    static update = async ({ user }: { user: UserType }) => {
        try {
            await this.axiosInstance.put('/user', user, this.authHeader())
        } catch (error: any) {
            throw error?.response?.data
        }
    }

    static me = async () => {
        try {
            // const result: AxiosResponse<UserType> =
            //     await this.axiosInstance.get('/user/me', this.authHeader())
            // return result.data
            return {
                _id: '1',
                created: '01/01/2024 00:00:00',
                full_name: 'Michel Douglas Grigoli',
                user_name: 'michel005',
                email: 'mdgrigoli@hotmail.com.br',
                birthday: '19/12/1991',
                phone: '(44) 99129-9291',
                person_type: 'PF',
                document_type: 'CPF',
                document_number: '08560640924',
                password: '123',
            }
        } catch (error: any) {
            throw error?.response?.data
        }
    }
}
