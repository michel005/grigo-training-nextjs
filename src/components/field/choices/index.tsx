'use client'

import { FieldLayout } from '@/components/field/layout'
import Button from '@/components/button'
import { useForm } from '@/hook/form'
import { LoginType } from '@/types/login.type'
import { useClosestDataForm } from '@/hook/closestDataForm'
import { Fragment, useRef } from 'react'
import { ErrorCollection } from '@/types/error.type'
import ButtonGroup from '@/components/buttonGroup'
import style from './index.module.scss'
import { FieldChoicesType } from '@/components/field/choices/index.type'

export const FieldChoices = ({
    label,
    disabled,
    formName,
    formField,
    options,
    error,
    type = 'MULTIPLE',
}: FieldChoicesType) => {
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

    const { field, update } = useForm<LoginType>(formDefinition.form)

    const value = field(formDefinition.field)

    if (type === 'SINGLE') {
        return (
            <FieldLayout
                label={label}
                haveValue={true}
                disabled={disabled}
                className={style.muscleGroup}
                input={() => (
                    <Fragment>
                        <button ref={ref} style={{ display: 'none' }} />
                        <ButtonGroup className={style.muscleGroupButtons}>
                            {Array.from(
                                options?.keys() || new Map().keys()
                            ).map((key) => {
                                return (
                                    <Button
                                        key={key}
                                        variant={
                                            value === key ? 'primary' : 'ghost'
                                        }
                                        onClick={() => {
                                            update(formDefinition.field, key)
                                        }}
                                    >
                                        {options?.get(key)}
                                    </Button>
                                )
                            })}
                        </ButtonGroup>
                    </Fragment>
                )}
                error={error || errorMessage}
            />
        )
    }

    return (
        <FieldLayout
            label={label}
            haveValue={true}
            disabled={disabled}
            className={style.muscleGroup}
            input={() => (
                <Fragment>
                    <button ref={ref} style={{ display: 'none' }} />
                    <ButtonGroup className={style.muscleGroupButtons}>
                        {Array.from(options?.keys() || new Map().keys()).map(
                            (key) => {
                                return (
                                    <Button
                                        key={key}
                                        variant={
                                            value?.split(';').includes(key)
                                                ? 'primary'
                                                : 'ghost'
                                        }
                                        onClick={() => {
                                            const optionList =
                                                value?.split(';') || []

                                            if (optionList.includes(key)) {
                                                optionList.splice(
                                                    optionList.indexOf(key),
                                                    1
                                                )
                                            } else {
                                                optionList.push(key)
                                            }

                                            update(
                                                formDefinition.field,
                                                optionList.sort().join(';')
                                            )
                                        }}
                                    >
                                        {options?.get(key)}
                                    </Button>
                                )
                            }
                        )}
                    </ButtonGroup>
                </Fragment>
            )}
            error={error || errorMessage}
        />
    )
}
