'use client'

import React, { createContext, ReactNode, useState } from 'react'
import {
    ConfigContextFormType,
    ConfigContextType,
} from '@/context/config/config.context.type'

export const ConfigContext = createContext<ConfigContextType>({
    value: () => ({}) as any,
    update: () => {},
    clearAll: () => {},
    updatePrev: () => {},
})

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
    const [forms, setForms] = useState(
        new Map<string, ConfigContextFormType>([])
    )

    const value = (form: string) => {
        return forms.get(form)
    }

    const update = (form: string, prop: string, value: any) => {
        setForms((prevForms) => {
            const newForms = new Map(prevForms)
            const formValue = newForms.get(form) || {}
            formValue[prop] = value
            newForms.set(form, { ...formValue })
            return newForms
        })
    }

    const updatePrev = (form: string, value: (v: any) => any) => {
        setForms((prevForms) => {
            const newForms = new Map(prevForms)
            const formValue = newForms.get(form) || {}
            newForms.set(form, { ...value(formValue) })
            return newForms
        })
    }

    const clearAll = () => {
        setForms(new Map())
    }

    return (
        <ConfigContext.Provider value={{ value, update, updatePrev, clearAll }}>
            {children}
        </ConfigContext.Provider>
    )
}
