import { ConfigContext } from '@/store/config.context'
import React, { useContext, useRef, useState } from 'react'
import Background from '../layout/background'
import Button from '../button'
import { Icon } from '../icon'
import FieldLayout from './fieldLayout'

interface SelectFieldType {
    formField?: string
    formError?: string
    label: string
    options: any[]
    loading?: boolean
    disabled?: boolean
    info?: React.ReactNode
    optionToLabel?: (option: any) => React.ReactNode
    optionToValue?: (option: any) => any
    valueToOption?: (value: any, optionsList: any[]) => any
    rightSpace?: React.ReactNode
    filter?: (options: any, filterValue: string) => boolean
}

const SelectField = ({
    formField,
    formError,
    label,
    options,
    loading,
    disabled,
    info,
    optionToLabel = (option) => option[1],
    optionToValue = (option) => option[0],
    valueToOption = (value, optionList) =>
        optionList.find((x) => x[0] === value),
    rightSpace,
    filter = (option, f) =>
        JSON.stringify(option)?.toUpperCase()?.includes(f.toUpperCase()),
}: SelectFieldType) => {
    const ref = useRef<any>()
    const [focus, setFocus] = useState(false)
    const [filterInput, setFilterInput] = useState('')
    const { formValue, updateFormProperty } = useContext(ConfigContext)
    const [formName, fieldName] = formField?.split('|') || [
        undefined,
        undefined,
    ]
    const [formNameError, fieldNameError] = formError?.split('|') || [
        `${formName}Error`,
        fieldName,
    ]

    const innerValue =
        fieldName && formName ? formValue(formName)?.[fieldName] || '' : ''

    return (
        <FieldLayout
            className="componentSelectField"
            loading={loading}
            label={label}
            focus={focus}
            hasValue={!!innerValue}
            disabled={disabled}
            input={() => (
                <>
                    {focus ? (
                        <input
                            className="componentSelectField__innerInput"
                            style={{
                                zIndex: 21,
                            }}
                            type="text"
                            value={filterInput}
                            onChange={(event) =>
                                setFilterInput(event.target.value)
                            }
                        />
                    ) : (
                        <div
                            className="componentSelectField__innerInput"
                            onClick={() => {
                                if (!disabled) {
                                    setFocus((x) => !x)
                                }
                            }}
                        >
                            {innerValue &&
                                optionToLabel(
                                    valueToOption(innerValue, options)
                                )}
                        </div>
                    )}
                    {!disabled && focus && (
                        <>
                            <Background
                                className="componentSelectField__selectOptionsBackground"
                                onClick={() => {
                                    setFocus(false)
                                    setFilterInput('')
                                }}
                            />
                            <div className="componentSelectField__selectOptions">
                                {label && <h3>{label}</h3>}
                                {options
                                    .filter((row) => filter(row, filterInput))
                                    .map((option, optionKey) => {
                                        return (
                                            <div
                                                key={optionKey}
                                                className={`${
                                                    option ===
                                                    valueToOption(
                                                        innerValue,
                                                        options
                                                    )
                                                        ? 'componentSelectField__currentOption'
                                                        : ''
                                                } componentSelectField__option`}
                                                onClick={() => {
                                                    if (fieldName && formName) {
                                                        updateFormProperty(
                                                            formName,
                                                            fieldName,
                                                            optionToValue(
                                                                option
                                                            )
                                                        )
                                                    }
                                                    setFocus(false)
                                                    setFilterInput('')
                                                }}
                                            >
                                                {optionToLabel(option)}
                                            </div>
                                        )
                                    })}
                            </div>
                        </>
                    )}
                </>
            )}
            error={
                formNameError &&
                fieldNameError &&
                formValue(formNameError)?.[fieldNameError]?.message
            }
            info={info}
            rightSpace={
                !disabled && (
                    <>
                        {!!innerValue && (
                            <Button
                                className="componentSelectField__actionButton"
                                leftSpace={<Icon>close</Icon>}
                                variant="ghost"
                                onClick={() => {
                                    if (fieldName && formName) {
                                        updateFormProperty(
                                            formName,
                                            fieldName,
                                            null
                                        )
                                    }
                                }}
                            />
                        )}
                        <Button
                            className="componentSelectField__actionButton"
                            leftSpace={
                                <Icon>
                                    {focus
                                        ? 'keyboard_arrow_up'
                                        : 'keyboard_arrow_down'}
                                </Icon>
                            }
                            variant="ghost"
                            onClick={() => {
                                setFocus((x) => !x)

                                var keyboardEvent = new KeyboardEvent(
                                    'keydown',
                                    {
                                        altKey: true,
                                        key: 'Space',
                                    }
                                )

                                ref.current?.focus()
                                ref.current?.dispatchEvent(keyboardEvent)
                            }}
                        />
                        {rightSpace}
                    </>
                )
            }
        />
    )
}

export default SelectField
