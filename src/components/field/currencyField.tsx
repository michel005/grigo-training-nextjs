import useForm from '@/hooks/useForm'
import { MaskUtils } from '@/utils/maskUtils'
import Button from '../button'
import FlexRow from '../layout/flexRow'
import FieldLayout from './fieldLayout'

type CurrencyFieldType = {
    formField?: string
    formError?: string
    label?: string
    info?: React.ReactNode
    loading?: boolean
    disabled?: boolean
    onBlur?: (val: string | null) => void
    rightSpace?: React.ReactNode
}

const CurrencyField = ({
    formField,
    formError,
    loading,
    label,
    info,
    disabled,
    onBlur,
    rightSpace,
}: CurrencyFieldType) => {
    const [formName, fieldName] = (formField || '|').split('|')
    const [formNameError, fieldNameError] = formError?.split('|') || [
        `${formName}Error`,
        fieldName,
    ]
    const form = useForm<any>(formName)
    const formErr = useForm<any>(formNameError)

    const innerValue = form.value?.[fieldName as string] || ''

    return (
        <FieldLayout
            loading={loading}
            disabled={disabled}
            label={label}
            leftSpace={
                <Button variant="secondary" disabled={true}>
                    R$
                </Button>
            }
            input={(_, setFocus) => {
                return (
                    <FlexRow
                        style={{
                            justifyContent: 'flex-end',
                            flexGrow: 1,
                            gap: '0',
                        }}
                    >
                        <input
                            className="componentFieldLayout__InputContainer__input__innerInput"
                            style={{
                                width: '100%',
                                maxWidth: 'none',
                                minWidth: 'auto',
                                textAlign: 'right',
                            }}
                            onFocus={() => setFocus(true)}
                            onBlur={() => {
                                setFocus(false)
                                onBlur?.(innerValue)
                            }}
                            disabled={disabled}
                            value={
                                (parseInt(innerValue || '0') / 100)
                                    .toString()
                                    .split('.')?.[0] || ''
                            }
                            onChange={(event) => {
                                const value = MaskUtils.onlyNumbers(
                                    event.target.value === '0'
                                        ? ''
                                        : event.target.value
                                )
                                const afterComma = (parseInt(innerValue) / 100)
                                    .toString()
                                    .split('.')[1]

                                form.updateProperty(
                                    fieldName as string,
                                    parseFloat(value + '.' + afterComma) * 100
                                )
                            }}
                        />
                        <FlexRow
                            style={{
                                alignItems: 'flex-end',
                                paddingBottom: '14px',
                            }}
                        >
                            ,
                        </FlexRow>
                        <input
                            className="componentFieldLayout__InputContainer__input__innerInput"
                            style={{
                                width: '25px',
                                flexGrow: 0,
                                textAlign: 'center',
                            }}
                            onFocus={() => setFocus(true)}
                            onBlur={() => {
                                setFocus(false)
                                onBlur?.(innerValue)
                            }}
                            disabled={disabled}
                            value={
                                (parseInt(innerValue) / 100)
                                    .toString()
                                    .split('.')?.[1] || '00'
                            }
                            onChange={(event) => {
                                const value = MaskUtils.onlyNumbers(
                                    event.target.value === ''
                                        ? '0'
                                        : event.target.value,
                                    2
                                )
                                const beforeComma = (parseInt(innerValue) / 100)
                                    .toString()
                                    .split('.')[0]

                                form.updateProperty(
                                    fieldName as string,
                                    parseFloat(beforeComma + '.' + value) * 100
                                )
                            }}
                        />
                    </FlexRow>
                )
            }}
            error={
                formNameError && fieldNameError
                    ? formErr.value?.[fieldNameError]?.message
                    : undefined
            }
            info={info}
            hasValue={true}
            rightSpace={rightSpace}
        />
    )
}

export default CurrencyField
