import style from './index.module.scss'
import { clsx } from 'clsx'
import { FormType } from '@/components/form/index.type'
import { useEffect } from 'react'
import { useForm } from '@/hook/form'

export const Form = ({ formName, className, errors, ...props }: FormType) => {
    const form = useForm<any>(formName || '')

    useEffect(() => {
        return () => {
            form.updatePrev(() => null)
        }
    }, [formName])

    return (
        <div
            {...props}
            className={clsx(style.form, className)}
            data-form={formName}
            data-errors={JSON.stringify(errors)}
        />
    )
}

export const FormRow = ({ formName, className, ...props }: FormType) => {
    return (
        <div
            {...props}
            className={clsx(style.formRow, className)}
            data-form={formName}
        />
    )
}
