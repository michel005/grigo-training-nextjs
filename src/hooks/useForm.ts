'use client'

import { ConfigContext } from '@/store/config.context'
import { useContext } from 'react'

const useForm = <T = any>(formName: string) => {
    const {
        formValue,
        updateForm,
        updateFormProp,
        updateFormProperty,
        clearForm,
    } = useContext(ConfigContext)

    return {
        value: formValue(formName) as T,
        update: (value: T) => updateForm(formName, value),
        updateProp: (property: string, value: (oldValue: any) => void) =>
            updateFormProp(formName, property, value),
        updateProperty: (property: string, value: any | null) =>
            updateFormProperty(formName, property, value),
        clear: () => clearForm(formName),
    }
}

export default useForm
