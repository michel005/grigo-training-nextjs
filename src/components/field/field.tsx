import useForm from '@/hooks/useForm'
import { MaskUtils } from '@/utils/maskUtils'
import FieldLayout from './fieldLayout'

type FieldType = {
    formField?: string
    formError?: string
    label?: string
    info?: React.ReactNode
    type?: React.InputHTMLAttributes<unknown>['type'] | 'price' | 'textarea'
    mask?: 'rg' | 'cpf' | 'cnpj' | 'cep'
    loading?: boolean
    disabled?: boolean
    onBlur?: (val: string | null) => void
    rightSpace?: React.ReactNode
}

const Field = ({
    formField,
    formError,
    loading,
    label,
    type,
    mask,
    info,
    disabled,
    onBlur,
    rightSpace,
}: FieldType) => {
    const [formName, fieldName] = (formField || '|').split('|')
    const [formNameError, fieldNameError] = formError?.split('|') || [
        `${formName}Error`,
        fieldName,
    ]
    const form = useForm<any>(formName)
    const formErr = useForm<any>(formNameError)

    const innerValue =
        form.value?.[fieldName as string] === null
            ? ''
            : form.value?.[fieldName as string]

    if (type === 'textarea') {
        return (
            <FieldLayout
                loading={loading}
                disabled={disabled}
                label={label}
                input={(_, setFocus) => {
                    return (
                        <textarea
                            disabled={disabled}
                            onFocus={() => setFocus(true)}
                            onBlur={() => setFocus(false)}
                            value={innerValue}
                            onChange={(event) => {
                                const value =
                                    event.target.value === ''
                                        ? null
                                        : event.target.value

                                form.updateProperty(fieldName as string, value)
                            }}
                        />
                    )
                }}
                error={
                    formNameError && fieldNameError
                        ? formErr.value?.[fieldNameError]?.message
                        : undefined
                }
                info={info}
                hasValue={!!innerValue}
                rightSpace={rightSpace}
            />
        )
    }

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
        return value
    }

    return (
        <FieldLayout
            loading={loading}
            disabled={disabled}
            label={label}
            input={(_, setFocus) => {
                return (
                    <input
                        onFocus={() => setFocus(true)}
                        onBlur={() => {
                            setFocus(false)
                            onBlur?.(innerValue)
                        }}
                        type={type}
                        value={changeValue(innerValue)}
                        disabled={disabled}
                        onChange={(event) => {
                            const value =
                                event.target.value === ''
                                    ? null
                                    : event.target.value

                            const valueWithoutMask =
                                mask && value
                                    ? MaskUtils.onlyNumbers(value)
                                    : value

                            form.updateProperty(
                                fieldName as string,
                                valueWithoutMask
                            )
                        }}
                    />
                )
            }}
            error={
                formNameError && fieldNameError
                    ? formErr.value?.[fieldNameError]?.message
                    : undefined
            }
            info={info}
            hasValue={!!innerValue}
            rightSpace={rightSpace}
        />
    )
}

export default Field
