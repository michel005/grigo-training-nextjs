'use client'

import { createContext, ReactNode, useEffect, useState } from 'react'
import {
    LoginResponseType,
    UserContextType,
} from '@/context/user/user.context.type'
import { UserType } from '@/types/user.type'
import { LoginType } from '@/types/login.type'
import { API } from '@/settings/axios.settings'
import { LOCAL_STORAGE_TOKEN, SessionUtils } from '@/utils/session.utils'

export const UserContext = createContext<UserContextType>({
    status: 'IDLE',
    currentUser: null,
    login: async () => {},
    logout: async () => {},
    me: async () => {},
})

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<UserType | null>(null)
    const [status, setStatus] = useState<UserContextType['status']>('IDLE')

    const login = async ({ email, password }: LoginType) => {
        const response = await API.post<LoginResponseType>('/user/login', {
            email,
            password,
        })

        setCurrentUser(response.data.user)
        localStorage.setItem(LOCAL_STORAGE_TOKEN, response.data.token)
    }

    const logout = async () => {
        setCurrentUser(null)
        localStorage.removeItem(LOCAL_STORAGE_TOKEN)
    }

    const me = async () => {
        const response = await API.get<UserType>(
            '/user/me',
            SessionUtils.tokenHeader()
        )
        setCurrentUser(response.data)
    }

    const loadUser = async () => {
        setStatus('LOADING')
        try {
            await me()
        } catch (error: any) {
            setCurrentUser(null)
            localStorage.removeItem(LOCAL_STORAGE_TOKEN)
        } finally {
            setStatus('DONE')
        }
    }

    useEffect(() => {
        if (localStorage.getItem(LOCAL_STORAGE_TOKEN)) {
            loadUser()
        }
    }, [])

    return (
        <UserContext.Provider
            value={{ status, currentUser, login, logout, me }}
        >
            {children}
        </UserContext.Provider>
    )
}
