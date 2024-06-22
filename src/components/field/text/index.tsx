'use client'

import { FieldLayout } from '@/components/field/layout'
import { FieldTextType } from '@/components/field/text/index.type'
import Button from '@/components/button'
import { useForm } from '@/hook/form'
import { LoginType } from '@/types/login.type'
import { MaskUtils } from '@/utils/mask.utils'
import { useClosestDataForm } from '@/hook/closestDataForm'
import { useRef } from 'react'
import { ErrorCollection } from '@/types/error.type'

export const FieldText = ({
    label,
    icon,
    type,
    disabled,
    formName,
    formField,
    mask,
    placeholder,
    error,
}: FieldTextType) => {
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

    const changeValue = (value: string) => {
        if (!value) {
            return value
        }
        if (mask === 'rg') {
            return MaskUtils.rg(value)
        }
        if (mask === 'cpf') {
            return MaskUtils.cpf(value)
        }
        if (mask === 'cnpj') {
            return MaskUtils.cnpj(value)
        }
        if (mask === 'cep') {
            return MaskUtils.cep(value)
        }
        if (mask === 'date') {
            return MaskUtils.date(value)
        }
        if (mask === 'time') {
            return MaskUtils.time(value)
        }
        if (mask === 'phone') {
            return MaskUtils.phone(value)
        }
        return value
    }

    const definePlaceholder = (): string => {
        if (placeholder) {
            return placeholder
        }
        if (mask === 'cpf') {
            return '999.999.999-99'
        }
        if (mask === 'cnpj') {
            return '99.999.999-9999.99'
        }
        if (mask === 'date') {
            return '99/99/9999'
        }
        if (mask === 'time') {
            return '99:99:99'
        }
        if (mask === 'phone') {
            return '(99) 99999-9999'
        }
        return label?.toString() || ''
    }

    return (
        <FieldLayout
            label={label}
            haveValue={haveField(formDefinition.field)}
            disabled={disabled}
            input={(setFocus) => (
                <input
                    ref={ref}
                    type={type}
                    value={changeValue(value) || ''}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    placeholder={definePlaceholder()}
                    onChange={(event) => {
                        const value =
                            event.target.value === ''
                                ? null
                                : event.target.value

                        const valueWithoutMask =
                            mask && value
                                ? ['date', 'time', 'phone'].includes(mask)
                                    ? (MaskUtils as any)[mask as any](value)
                                    : MaskUtils.onlyNumbers(value)
                                : value

                        update(formDefinition.field, valueWithoutMask)
                    }}
                />
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
