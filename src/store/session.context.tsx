'use client'

import UserBusiness from '@/business/user.business'
import { UserType } from '@/types/UserType'
import { useRouter } from 'next/navigation'
import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from 'react'
import { ConfigContext } from './config.context'

export interface SessionContextType {
    loading?: boolean
    currentUser?: UserType | null
    setCurrentUser: Dispatch<SetStateAction<UserType | null>>
    logoff: () => void
}

export const SessionContext = createContext<SessionContextType>({
    loading: undefined,
    currentUser: undefined,
    setCurrentUser: () => {},
    logoff: () => {},
})

const AUTH_TOKEN = 'auth_token'

export const SessionProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const router = useRouter()
    const { clearAll } = useContext(ConfigContext)
    const [currentUser, setCurrentUser] = useState<UserType | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    const logoff = () => {
        clearAll()
        localStorage.removeItem(AUTH_TOKEN)
        setCurrentUser(null)
        setLoading(true)
        router.push('/')
    }

    useEffect(() => {
        if (loading) {
            if (localStorage.getItem(AUTH_TOKEN)) {
                UserBusiness.me()
                    .then((user) => {
                        setCurrentUser(user)
                    })
                    .catch(() => {
                        setCurrentUser(null)
                        localStorage.removeItem(AUTH_TOKEN)
                    })
                    .finally(() => {
                        setLoading(false)
                    })
            } else {
                setLoading(false)
            }
        }
    }, [loading])

    return (
        <SessionContext.Provider
            value={{ currentUser, setCurrentUser, loading, logoff }}
        >
            {children}
        </SessionContext.Provider>
    )
}
