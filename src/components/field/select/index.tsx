'use client'

import { FieldLayout } from '@/components/field/layout'
import Button from '@/components/button'
import { useForm } from '@/hook/form'
import { LoginType } from '@/types/login.type'
import { useClosestDataForm } from '@/hook/closestDataForm'
import { useRef } from 'react'
import { ErrorCollection } from '@/types/error.type'
import { FieldSelectType } from '@/components/field/select/index.type'

export const FieldSelect = ({
    label,
    icon,
    disabled,
    formName,
    formField,
    options,
    error,
}: FieldSelectType) => {
    const ref = useRef<any>(null)
    const { dataForm, errorForm } = useClosestDataForm(ref)

    const formDefinition = {
        form: dataForm || formName || 'noForm',
        field: formField || 'someField',
    }

    const errorMessage =
        errorForm?.type === 'collection'
            ? (errorForm?.errors as ErrorCollection)?.[formDefinition.field]
                  ?.message
            : null

    const { field, haveField, update } = useForm<LoginType>(formDefinition.form)

    const value = field(formDefinition.field)

    return (
        <FieldLayout
            label={label}
            haveValue={haveField(formDefinition.field)}
            disabled={disabled}
            input={(setFocus) => (
                <select
                    ref={ref}
                    value={options?.get(value)}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    onChange={(event) => {
                        update(formDefinition.field, event.target.value)
                    }}
                >
                    <option></option>
                    {Array.from(options?.keys() || [])
                        .sort()
                        .map((option, key) => {
                            return (
                                <option key={option} value={option}>
                                    {options?.get(option)}
                                </option>
                            )
                        })}
                </select>
            )}
            leftSide={icon && <Button icon={icon} disabled={true} />}
            rightSide={
                !!value &&
                !disabled && (
                    <Button
                        icon="close"
                        onClick={() => {
                            update(formDefinition.field, '')
                        }}
                    />
                )
            }
            error={error || errorMessage}
        />
    )
}
