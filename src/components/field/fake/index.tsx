'use client'

import { FieldLayout } from '@/components/field/layout'
import Button from '@/components/button'
import { useForm } from '@/hook/form'
import { LoginType } from '@/types/login.type'
import { useClosestDataForm } from '@/hook/closestDataForm'
import { useRef } from 'react'
import style from '../layout/index.module.scss'
import { FieldFakeType } from '@/components/field/fake/index.type'

export const FieldFake = ({
    label,
    icon,
    formName,
    formField,
}: FieldFakeType) => {
    const ref = useRef<any>(null)
    const { dataForm, errorForm } = useClosestDataForm(ref)

    const formDefinition = {
        form: dataForm || formName || 'noForm',
        field: formField || 'someField',
    }

    const { field, haveField } = useForm<LoginType>(formDefinition.form)

    const value = field(formDefinition.field)

    return (
        <FieldLayout
            label={label}
            haveValue={haveField(formDefinition.field)}
            disabled={true}
            input={() => (
                <div ref={ref} className={style.fakeInput}>
                    {value}
                </div>
            )}
            leftSide={icon && <Button icon={icon} disabled={true} />}
        />
    )
}
