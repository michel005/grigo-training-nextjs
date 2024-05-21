import useForm from '@/hooks/useForm'
import FieldLayout from './fieldLayout'

type NumberFieldType = {
    formField?: string
    formError?: string
    label?: string
    info?: React.ReactNode
    autoFocus?: boolean
    loading?: boolean
    disabled?: boolean
    rightSpace?: React.ReactNode
}

const NumberField = ({
    formField,
    formError,
    loading,
    label,
    info,
    disabled,
    rightSpace,
}: NumberFieldType) => {
    const [formName, fieldName, subFieldName] = (formField || '|').split('|')
    const [formNameError, fieldNameError, subFieldNameError] = formError?.split(
        '|'
    ) || [`${formName}Error`, fieldName, subFieldName]
    const form = useForm<any>(formName)
    const formErr = useForm<any>(formNameError)

    const innerValue = subFieldName
        ? form.value?.[fieldName as string]?.[subFieldName] === null
            ? ''
            : form.value?.[fieldName as string]?.[subFieldName]
        : form.value?.[fieldName as string] === null
          ? ''
          : form.value?.[fieldName as string]

    return (
        <FieldLayout
            disabled={disabled}
            loading={loading}
            label={label}
            input={(_, setFocus) => {
                return (
                    <input
                        disabled={disabled}
                        onFocus={() => setFocus(true)}
                        onBlur={() => setFocus(false)}
                        type="number"
                        value={innerValue}
                        onChange={(event) => {
                            const value =
                                event.target.value === ''
                                    ? '0'
                                    : event.target.value

                            if (subFieldName) {
                                form.updateProp(fieldName as string, (old) => {
                                    const newValue = old || {}
                                    newValue[subFieldName] = parseInt(value)
                                    return { ...old }
                                })
                            } else {
                                form.updateProperty(
                                    fieldName as string,
                                    parseInt(value)
                                )
                            }
                        }}
                    />
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
            hasValue={!!innerValue}
            rightSpace={rightSpace}
        />
    )
}

export default NumberField
