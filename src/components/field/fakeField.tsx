import { MaskUtils } from '@/utils/maskUtils'
import FieldLayout from './fieldLayout'
import FlexRow from '../layout/flexRow'

type FakeFieldType = {
    label?: string
    value?: React.ReactNode
    mask?: 'rg' | 'cpf' | 'cnpj' | 'cep'
    alignment?: 'left' | 'center' | 'right'
    loading?: boolean
    leftSpace?: React.ReactNode
    rightSpace?: React.ReactNode
}

const FakeField = ({
    label,
    value,
    loading,
    mask,
    alignment = 'left',
    leftSpace,
    rightSpace,
}: FakeFieldType) => {
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
            disabled={true}
            label={label}
            input={() => (
                <FlexRow
                    className="innerInput"
                    style={{
                        alignItems: 'center',
                        color: '#222',
                        marginLeft:
                            alignment === 'center' || alignment === 'right'
                                ? 'auto'
                                : '',
                        marginRight:
                            alignment === 'center' || alignment === 'left'
                                ? 'auto'
                                : '',
                    }}
                >
                    {typeof value === 'string' ? changeValue(value) : value}
                </FlexRow>
            )}
            hasValue={!!value}
            leftSpace={leftSpace}
            rightSpace={rightSpace}
        />
    )
}

export default FakeField
