import { AxiosRequestConfig } from 'axios'

export const LOCAL_STORAGE_TOKEN = 'SecurityToken'

export class SessionUtils {
    static tokenHeader = (): AxiosRequestConfig => ({
        headers: {
            Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN)}`,
        },
    })
}
