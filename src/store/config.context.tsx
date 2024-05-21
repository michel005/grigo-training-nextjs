'use client'

import { createContext, useCallback, useEffect, useState } from 'react'

export type FormType = Map<string, any>

export interface ConfigContextType {
    formValue: (name: string) => any | null
    updateForm: (name: string, value: any) => void
    updateFormProp: (
        name: string,
        property: string,
        value: (oldValue: any) => void
    ) => void
    updateFormProperty: (name: string, property: string, value: any) => any
    clearForm: (name: string) => void
    clearAll: () => void
    afterForm: (name: string) => any | null
    updateAfterForm: (name: string, value: any) => void
}

export const ConfigContext = createContext<ConfigContextType>({
    formValue: () => null,
    updateForm: () => {},
    updateFormProp: () => {},
    updateFormProperty: () => {},
    clearForm: () => {},
    clearAll: () => {},
    afterForm: () => null,
    updateAfterForm: () => {},
})

export const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
    const [form, setForm] = useState<FormType>(new Map())
    const [_afterForm, setAfterForm] = useState<FormType>(new Map())
    const [loadingLocalStorage, setLoadingLocalStorage] =
        useState<boolean>(true)

    const formValue = useCallback(
        (name: string) => {
            return form.get(name) || null
        },
        [form]
    )

    const afterForm = useCallback(
        (name: string) => {
            return _afterForm.get(name) || null
        },
        [_afterForm]
    )

    const updateAfterForm = useCallback((name: string, value: any) => {
        setAfterForm((prevValue) => {
            prevValue.set(name, value)
            return new Map(prevValue)
        })
    }, [])

    const updateForm = useCallback((name: string, value: any) => {
        setForm((prevValue) => {
            prevValue.set(name, JSON.parse(JSON.stringify(value)))
            return new Map(prevValue)
        })
    }, [])

    const updateFormProp = useCallback(
        (name: string, property: string, value: (oldValue: any) => any) => {
            setForm((prevValue) => {
                let oldValue = prevValue.get(name) || {}
                oldValue[property] = value(oldValue[property])

                prevValue.set(name, JSON.parse(JSON.stringify(oldValue)))
                return new Map(prevValue)
            })
        },
        []
    )

    const updateFormProperty = useCallback(
        (name: string, property: string, value: any) => {
            setForm((prevValue) => {
                let oldValue = prevValue.get(name) || {}
                oldValue[property] = value
                prevValue.set(name, oldValue)
                return new Map(prevValue)
            })
        },
        []
    )

    const clearForm = useCallback((name: string) => {
        setForm((prevValue) => {
            prevValue.delete(name)
            if (name.startsWith('_')) {
                localStorage.removeItem(name)
            }
            return new Map(prevValue)
        })
    }, [])

    const clearAll = useCallback(() => {
        setForm(new Map([]))
    }, [])

    useEffect(() => {
        if (!loadingLocalStorage) {
            const allForms = Array.from(form.keys()).filter((x) =>
                x.startsWith('_')
            )
            allForms.forEach((f) => {
                localStorage.setItem(f, JSON.stringify(form.get(f)))
            })
        }
    }, [loadingLocalStorage, form])

    useEffect(() => {
        if (loadingLocalStorage) {
            const allForms = new Map<string, any>([])
            for (let index = 0; index < localStorage.length; index++) {
                const key = localStorage.key(index)
                if (key && key.startsWith('_') && localStorage.getItem(key)) {
                    allForms.set(
                        key,
                        JSON.parse(localStorage.getItem(key) as string)
                    )
                }
            }

            setForm(allForms)
            setLoadingLocalStorage(false)
        }
    }, [loadingLocalStorage])

    return (
        <ConfigContext.Provider
            value={{
                formValue,
                updateForm,
                updateFormProp,
                updateFormProperty,
                clearForm,
                clearAll,
                afterForm,
                updateAfterForm,
            }}
        >
            {children}
        </ConfigContext.Provider>
    )
}
