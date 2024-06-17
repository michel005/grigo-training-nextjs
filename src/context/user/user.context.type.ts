import { UserType } from '@/types/user.type'
import { LoginType } from '@/types/login.type'
import { UseAPIType } from '@/hook/api/index.type'

export interface LoginResponseType {
    token: string
    user: UserType
}

export interface UserContextType {
    status: 'IDLE' | 'LOADING' | 'DONE'
    currentUser: UserType | null
    login: ({ email, password }: LoginType) => Promise<void>
    logout: () => Promise<void>
    me: () => Promise<void>
}
