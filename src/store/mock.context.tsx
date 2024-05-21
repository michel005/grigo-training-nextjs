'use client'

import React, { createContext, useContext, useEffect } from 'react'
import { SessionContext } from '@/store/session.context'

export interface MockContextType {}

export const MockContext = createContext<MockContextType>({})

export const MockProvider = ({ children }: { children: React.ReactNode }) => {
    const { currentUser, setCurrentUser } = useContext(SessionContext)

    useEffect(() => {
        if (!currentUser) {
            setCurrentUser({
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
            })
        }
    }, [currentUser])
    return <MockContext.Provider value={{}}>{children}</MockContext.Provider>
}
