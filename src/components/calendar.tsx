import { DateUtils } from '@/utils/dateUtils'
import { useEffect, useMemo, useState } from 'react'
import Button from './button'
import FlexColumn from './layout/flexColumn'
import FlexRow from './layout/flexRow'
import Grid from './layout/grid'
import { Icon } from './icon'

const WeekDay: string[] = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
]

const Months: string[] = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
]

const addMonth = (date: number[]) => {
    if (date[0] === 11) {
        return [0, date[1] + 1]
    } else {
        return [date[0] + 1, date[1]]
    }
}

const removeMonth = (date: number[]) => {
    if (date[0] === 0) {
        return [11, date[1] - 1]
    } else {
        return [date[0] - 1, date[1]]
    }
}

const monthLength = (date: number[]) => {
    const current = new Date(date[1], date[0] + 1, 1)
    return new Date((current as any) - 1).getDate()
}

const firstDayOfMonth = (date: number[]) => {
    const current = new Date(date[1], date[0], 1)
    return current.getDay()
}

interface CalendarType {
    type?: 'single' | 'range'
    value?: any
    onChange?: (val: any) => void
    className?: string
}

const Calendar = ({
    className,
    type = 'single',
    value,
    onChange,
}: CalendarType) => {
    const [current, setCurrent] = useState<number[]>([
        new Date().getMonth(),
        new Date().getFullYear(),
    ])

    const lengthOfPrevMonth = monthLength(removeMonth(current))
    const firstDayOfPrevMonth = lengthOfPrevMonth - firstDayOfMonth(current)
    const today = useMemo(() => DateUtils.dateToString(new Date()), [])
    const lastDays = useMemo(
        () => 42 - (firstDayOfMonth(current) + monthLength(current)),
        [current]
    )

    useEffect(() => {
        if (value) {
            if (type === 'single') {
                setCurrent([
                    +(value?.split?.('/')?.[1] || new Date().getMonth() + 1) -
                        1,
                    +(value?.split('/')?.[2] || new Date().getFullYear()),
                ])
            } else {
                setCurrent([
                    +(
                        value?.[0]?.split?.('/')?.[1] ||
                        new Date().getMonth() + 1
                    ) - 1,
                    +(value?.[0]?.split('/')?.[2] || new Date().getFullYear()),
                ])
            }
        }
    }, [value])

    return (
        <FlexColumn className={`componentCalendar ${className}`}>
            <FlexRow>
                <Button
                    leftSpace={<Icon>keyboard_arrow_left</Icon>}
                    variant="ghost"
                    onClick={() => {
                        setCurrent((x) => removeMonth(x))
                    }}
                />
                <FlexColumn className="componentCalendar__monthYear">
                    {`${Months[current[0]]} - ${current[1]}`}
                </FlexColumn>
                <Button
                    leftSpace={<Icon>keyboard_arrow_right</Icon>}
                    variant="ghost"
                    onClick={() => {
                        setCurrent((x) => addMonth(x))
                    }}
                />
            </FlexRow>
            <FlexColumn className="componentCalendar__weekDaysAndDays">
                <Grid
                    className="componentCalendar__weekDays"
                    columnTemplate="repeat(7, 1fr)"
                >
                    {WeekDay.map((weekDay, index) => {
                        return (
                            <Button key={index}>
                                {weekDay.substring(0, 1)}
                            </Button>
                        )
                    })}
                </Grid>
                <Grid
                    className="componentCalendar__days"
                    columnTemplate="repeat(7, 1fr)"
                >
                    {new Array(firstDayOfMonth(current))
                        .fill(null)
                        .map((_, x) => {
                            return (
                                <Button
                                    disabled={true}
                                    key={DateUtils.dateToString(
                                        new Date(current[1], current[0], x + 1)
                                    )}
                                    variant="secondary"
                                >
                                    {firstDayOfPrevMonth + x + 1}
                                </Button>
                            )
                        })}
                    {new Array(monthLength(current)).fill(null).map((_, x) => {
                        const day = DateUtils.dateToString(
                            new Date(current[1], current[0], x + 1)
                        )

                        return (
                            <Button
                                key={day}
                                variant="secondary"
                                className={`${today === day ? 'current' : ''} ${
                                    (
                                        type === 'single'
                                            ? value === day
                                            : (!!value?.[0] &&
                                                  value?.[0] === day) ||
                                              (!!value?.[1] &&
                                                  value?.[1] === day) ||
                                              (!!value?.[0] &&
                                                  !!value?.[1] &&
                                                  DateUtils.betweenString(
                                                      day,
                                                      value?.[0],
                                                      value?.[1]
                                                  ))
                                    )
                                        ? 'selected'
                                        : ''
                                }`}
                                onClick={() => {
                                    if (type === 'single') {
                                        onChange?.(day)
                                    } else {
                                        let values = null
                                        if (!value) {
                                            values = [day]
                                        } else if (
                                            !!value?.[0] &&
                                            !value?.[1]
                                        ) {
                                            values = [value[0], day]
                                        } else if (
                                            !!value?.[0] &&
                                            !!value?.[1]
                                        ) {
                                            values = null
                                        }
                                        onChange?.(values?.sort())
                                    }
                                }}
                            >
                                {x + 1}
                            </Button>
                        )
                    })}
                    {new Array(lastDays).fill(null).map((_, x) => {
                        return (
                            <Button
                                disabled={true}
                                key={DateUtils.dateToString(
                                    new Date(current[1], current[0], x + 1)
                                )}
                                variant="secondary"
                            >
                                {x + 1}
                            </Button>
                        )
                    })}
                </Grid>
            </FlexColumn>
            <FlexColumn className="componentCalendar__commands">
                {!!value && (
                    <Button
                        variant="link"
                        onClick={() => {
                            onChange?.(null)
                        }}
                    >
                        Limpar seleção
                    </Button>
                )}
            </FlexColumn>
        </FlexColumn>
    )
}

export default Calendar
