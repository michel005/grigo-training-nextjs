import useForm from '@/hooks/useForm'
import { useState } from 'react'
import Button from '../button'
import FlexRow from '../layout/flexRow'
import { Icon } from '../icon'
import FieldLayout from './fieldLayout'

type TagFieldType = {
    formField?: string
    formError?: string
    label?: string
    info?: React.ReactNode
    autoFocus?: boolean
    loading?: boolean
    disabled?: boolean
    rightSpace?: React.ReactNode
}

const TagField = ({
    formField,
    formError,
    loading,
    label,
    info,
    disabled,
    rightSpace,
}: TagFieldType) => {
    const [formName, fieldName, subFieldName] = (formField || '|').split('|')
    const [formNameError, fieldNameError, subFieldNameError] = formError?.split(
        '|'
    ) || [`${formName}Error`, fieldName, subFieldName]
    const form = useForm<any>(formName)
    const formErr = useForm<any>(formNameError)
    const [val, setVal] = useState('')

    const innerValue = subFieldName
        ? form.value?.[fieldName as string]?.[subFieldName] === null
            ? ''
            : form.value?.[fieldName as string]?.[subFieldName]
        : form.value?.[fieldName as string] === null
          ? ''
          : form.value?.[fieldName as string]

    const listOfTags = (innerValue || '')
        .split(';')
        .filter((x: string) => x !== '')
        .map((x: string) => x.trim())

    return (
        <FieldLayout
            className="componentTagField"
            loading={loading}
            disabled={disabled}
            label={label}
            input={(_, setFocus) => {
                return (
                    <>
                        <FlexRow
                            className={`componentTagField__allTags ${disabled && 'disabled'}`}
                        >
                            {listOfTags.map((tag: string) => (
                                <FlexRow
                                    key={tag}
                                    className="componentTagField__tag"
                                >
                                    {tag}
                                    {!disabled && (
                                        <Button
                                            leftSpace={<Icon>close</Icon>}
                                            onClick={() => {
                                                form.updateProperty(
                                                    fieldName,
                                                    innerValue
                                                        .replace(tag, '')
                                                        .replace(';;', ';')
                                                )
                                            }}
                                            variant="link"
                                        />
                                    )}
                                </FlexRow>
                            ))}
                            {!disabled && (
                                <input
                                    className="componentTagField__input"
                                    onFocus={() => setFocus(true)}
                                    onBlur={() => setFocus(false)}
                                    value={val}
                                    disabled={disabled}
                                    placeholder="Digite aqui e precione enter para adicionar"
                                    onChange={(event) => {
                                        setVal(event.target.value)
                                    }}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                            form.updateProperty(
                                                fieldName,
                                                Array.from(
                                                    new Map(
                                                        [...listOfTags, val]
                                                            .sort()
                                                            .map((x) => [x, x])
                                                    ).keys()
                                                ).join(';')
                                            )
                                            setVal('')
                                        }
                                    }}
                                />
                            )}
                        </FlexRow>
                    </>
                )
            }}
            error={
                formNameError && fieldNameError
                    ? subFieldName
                        ? formErr.value?.[fieldNameError]?.[subFieldNameError]
                              ?.message
                        : formErr.value?.[fieldNameError]?.message
                    : undefined
            }
            info={info}
            hasValue={listOfTags.length > 0}
            rightSpace={rightSpace}
        />
    )
}

export default TagField
