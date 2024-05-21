import useForm from '@/hooks/useForm'
import { MaskUtils } from '@/utils/maskUtils'
import { useState } from 'react'
import Button from '../button'
import Calendar from '../calendar'
import { Icon } from '../icon'
import Background from '../layout/background'
import FieldLayout from './fieldLayout'

type DateFieldType = {
    label: string
    formField?: string
    formError?: string
    info?: string
    type?: 'single' | 'range'
    loading?: boolean
    disabled?: boolean
}

const DateField = ({
    label,
    formField,
    formError,
    loading,
    disabled,
    info,
    type = 'single',
}: DateFieldType) => {
    const [formName, fieldName, subFieldName] = (formField || '|').split('|')
    const [formNameError, fieldNameError, subFieldNameError] = formError?.split(
        '|'
    ) || [`${formName}Error`, fieldName, subFieldName]

    const form = useForm<any>(formName)
    const formErr = useForm<any>(formNameError)
    const [show, setShow] = useState<boolean>(false)

    const innerValue = subFieldName
        ? form.value?.[fieldName as string]?.[subFieldName] === null
            ? ''
            : form.value?.[fieldName as string]?.[subFieldName]
        : form.value?.[fieldName as string] === null
          ? ''
          : form.value?.[fieldName as string]

    return (
        <FieldLayout
            className="componentDateField"
            label={label}
            disabled={disabled}
            loading={loading}
            input={(_, setFocus) => (
                <>
                    {show && (
                        <Background
                            id="calendar_background"
                            className="componentDateField__calendarBackground"
                            onClick={(event) => {
                                if (
                                    (event.target as any).id ===
                                    'calendar_background'
                                ) {
                                    setShow(false)
                                }
                            }}
                            variant="blur"
                        >
                            <Calendar
                                className="componentDateField__calendar"
                                type={type}
                                value={innerValue}
                                onChange={(value: string) => {
                                    if (subFieldName) {
                                        form.updateProp(
                                            fieldName as string,
                                            (old) => {
                                                const newValue = old || {}
                                                newValue[subFieldName] = value
                                                return { ...old }
                                            }
                                        )
                                    } else {
                                        form.updateProperty(
                                            fieldName as string,
                                            value
                                        )
                                    }
                                    if (type === 'single') {
                                        setShow(false)
                                    }
                                }}
                            />
                        </Background>
                    )}
                    {type === 'single' && (
                        <input
                            onFocus={() => setFocus(true)}
                            onBlur={() => setFocus(false)}
                            disabled={disabled}
                            value={
                                !innerValue || innerValue === ''
                                    ? ''
                                    : MaskUtils.date(innerValue)
                            }
                            onChange={(event) => {
                                const value =
                                    event.target.value === ''
                                        ? null
                                        : event.target.value

                                if (subFieldName) {
                                    form.updateProp(
                                        fieldName as string,
                                        (old) => {
                                            const newValue = old || {}
                                            newValue[subFieldName] = value
                                            return { ...old }
                                        }
                                    )
                                } else {
                                    form.updateProperty(
                                        fieldName as string,
                                        value
                                    )
                                }
                            }}
                        />
                    )}
                    {innerValue && type === 'range' && (
                        <Button
                            variant="link"
                            className="componentDateField__range"
                            onClick={() => {
                                setShow(true)
                            }}
                        >
                            {innerValue?.[0]} - {innerValue?.[1]}
                        </Button>
                    )}
                </>
            )}
            rightSpace={
                !disabled && (
                    <>
                        {!!innerValue && (
                            <Button
                                style={{ color: '#aaa' }}
                                leftSpace={<Icon>close</Icon>}
                                variant="ghost"
                                onClick={() => {
                                    if (subFieldName) {
                                        form.updateProp(
                                            fieldName as string,
                                            (old) => {
                                                const newValue = old || {}
                                                newValue[subFieldName] = null
                                                return { ...old }
                                            }
                                        )
                                    } else {
                                        form.updateProperty(
                                            fieldName as string,
                                            null
                                        )
                                    }
                                }}
                            />
                        )}
                        <Button
                            style={{ color: '#aaa' }}
                            leftSpace={<Icon>calendar_month</Icon>}
                            variant="ghost"
                            onClick={() => {
                                setShow((x) => !x)
                            }}
                        />
                    </>
                )
            }
            info={info}
            error={
                formNameError && fieldNameError
                    ? subFieldName
                        ? formErr.value?.[fieldNameError]?.[subFieldNameError]
                              ?.message
                        : formErr.value?.[fieldNameError]?.message
                    : undefined
            }
            hasValue={!!innerValue}
        />
    )
}

export default DateField
