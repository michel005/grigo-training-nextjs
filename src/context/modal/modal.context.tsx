'use client'

import React, { createContext, ReactNode, useState } from 'react'
import { ModalContextType } from '@/context/modal/modal.context.type'

export const ModalContext = createContext<ModalContextType>({
    allModals: new Map(),
    onCloseEvents: new Map(),
    open: () => {},
    close: () => {
        console.log('Close')
    },
    clearAll: () => {},
})

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [modals, setModals] = useState<ModalContextType['allModals']>(
        new Map<string, any>()
    )
    const [onCloseEvent, setOnCloseEvent] = useState<
        ModalContextType['onCloseEvents']
    >(new Map<string, any>())

    const open = (
        screen: string,
        type: string,
        value: any,
        onCloseEvent: () => void = () => {}
    ) => {
        setModals((x) => {
            x.set(`${screen}.${type}`, value)
            return new Map<string, boolean>(x)
        })
        setOnCloseEvent((x) => {
            x.set(`${screen}.${type}`, onCloseEvent)
            return new Map<string, () => void>(x)
        })
    }

    const close = (screen: string, type: string) => {
        setModals((x) => {
            x.delete(`${screen}.${type}`)
            return new Map<string, boolean>(x)
        })
        onCloseEvent.get(`${screen}.${type}`)?.()
        setOnCloseEvent((x) => {
            x.delete(`${screen}.${type}`)
            return new Map<string, () => void>(x)
        })
    }

    const clearAll = () => {
        setModals(new Map())
        setOnCloseEvent(new Map())
    }

    return (
        <ModalContext.Provider
            value={{
                allModals: modals,
                onCloseEvents: onCloseEvent,
                open,
                close,
                clearAll,
            }}
        >
            {children}
        </ModalContext.Provider>
    )
}
