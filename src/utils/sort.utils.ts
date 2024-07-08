import { DateUtils } from '@/utils/date.utils'

export class SortUtils {
    static today: string = DateUtils.dateToString(new Date())
    static todayWithTime: string = DateUtils.dateTimeToString(new Date())

    static sort(
        x: any,
        y: any,
        field: string,
        direction: 'ASC' | 'DESC' = 'ASC'
    ) {
        if ((x?.[field] || '') > (y?.[field] || ''))
            return direction === 'ASC' ? 1 : -1
        if ((x?.[field] || '') < (y?.[field] || ''))
            return direction === 'ASC' ? -1 : 1
        return 0
    }

    static sortDateTime(
        x: any,
        y: any,
        field: string,
        direction: 'ASC' | 'DESC' = 'ASC'
    ) {
        if (
            DateUtils.stringToDateTime(x[field] || SortUtils.todayWithTime) >
            DateUtils.stringToDateTime(y[field] || SortUtils.todayWithTime)
        ) {
            return direction === 'ASC' ? 1 : -1
        }
        if (
            DateUtils.stringToDateTime(x[field] || SortUtils.todayWithTime) <
            DateUtils.stringToDateTime(y[field] || SortUtils.todayWithTime)
        ) {
            return direction === 'ASC' ? -1 : 1
        }
        return 0
    }

    static sortDate(
        x: any,
        y: any,
        field: string,
        direction: 'ASC' | 'DESC' = 'ASC'
    ) {
        if (
            DateUtils.stringToDate(x[field] || SortUtils.today) >
            DateUtils.stringToDate(y[field] || SortUtils.today)
        ) {
            return direction === 'ASC' ? 1 : -1
        }
        if (
            DateUtils.stringToDate(x[field] || SortUtils.today) <
            DateUtils.stringToDate(y[field] || SortUtils.today)
        ) {
            return direction === 'ASC' ? -1 : 1
        }
        return 0
    }

    static group(values: any[]) {
        return Array.from(new Map(values.map((x) => [x, null])).keys())
    }
}
