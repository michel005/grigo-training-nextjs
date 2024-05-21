import FlexRow from '../layout/flexRow'

interface BarChartType {
    label?: string
    max?: number
    orientation?: 'ltr' | 'rtl'
    value: number
}

const BarChart = ({
    label,
    max = 100,
    orientation = 'ltr',
    value,
}: BarChartType) => {
    return (
        <FlexRow className="componentBarChart" dir={orientation}>
            <span dir="ltr">{label}</span>
            <div
                className="componentBarChart__value"
                style={{ width: `${(value / 100) * max}%` }}
            />
        </FlexRow>
    )
}

export default BarChart
