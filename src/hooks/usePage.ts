import { ConfigContext } from '@/store/config.context'
import { useContext, useMemo } from 'react'

interface Form {
    value: any
    update: (value: any) => void
    updateProp: (prop: string, value: any) => void
    clear: () => void
}

const usePage = (...forms: string[]) => {
    const { formValue, updateForm, updateFormProperty, clearForm } =
        useContext(ConfigContext)

    const formReturn = useMemo(() => {
        const ret: { [key: string]: Form } = {}
        for (const form of forms) {
            ret[form] = {
                value: formValue(form),
                update: (value) => updateForm(form, value),
                updateProp: (prop, value) =>
                    updateFormProperty(form, prop, value),
                clear: () => clearForm(form),
            }
        }
        return ret
    }, [forms])

    return formReturn
}

export default usePage
