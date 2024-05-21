'use client'

import { createContext, useState } from 'react'

export type FormType = Map<string, string>

export interface ConfigContextType {
    value: (name: string) => string | null
    update: (name: string, value: string) => void
    clear: (name: string) => void
    clearAll: () => void
}

export const CacheContext = createContext<ConfigContextType>({
    value: () => null,
    update: () => {},
    clear: () => {},
    clearAll: () => {},
})

export const CacheProvider = ({ children }: { children: React.ReactNode }) => {
    const [form, setForm] = useState<FormType>(new Map())

    const value = (name: string) => {
        return form.get(name) || null
    }

    const update = (name: string, value: string) => {
        setForm((prevValue) => {
            prevValue.set(name, JSON.parse(JSON.stringify(value)))
            return new Map(prevValue)
        })
    }

    const clear = (name: string) => {
        setForm((prevValue) => {
            prevValue.delete(name)
            return new Map(prevValue)
        })
    }

    const clearAll = () => {
        setForm(new Map())
    }

    return (
        <CacheContext.Provider
            value={{
                value,
                update,
                clear,
                clearAll,
            }}
        >
            {children}
        </CacheContext.Provider>
    )
}
