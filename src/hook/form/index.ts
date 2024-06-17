'use client'

import { useContext } from 'react'
import { ConfigContext } from '@/context/config/config.context'
import { UseFormType } from '@/hook/form/index.type'
import { ConfigContextFormType } from '@/context/config/config.context.type'

export const useForm = <T = ConfigContextFormType>(
    formName: string,
    fallback: T = {} as any
): UseFormType<T> => {
    const { update, updatePrev, value } = useContext(ConfigContext)

    const form = value(formName) || fallback
    const field = (prop: string) => (form as any)[prop]

    return {
        form,
        field,
        haveField: (field: string) => !!value(formName)?.[field],
        update: (prop: string, value: any) => {
            update(formName, prop, value)
        },
        updatePrev: (value: any) => {
            return updatePrev(formName, value)
        },
    }
}
