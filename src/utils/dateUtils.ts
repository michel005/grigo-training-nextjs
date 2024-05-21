export class DateUtils {
    static toDate = (day: number, month: number, year: number) => {
        return new Date(year, month + 1, day)
    }

    static dateToString = (date: Date | null) => {
        return date?.toLocaleDateString?.('pt-BR') || ''
    }

    static timeToString = (date: Date | null) => {
        return date?.toLocaleTimeString?.('pt-BR') || ''
    }

    static dateTimeToString = (date: Date | null) => {
        return (date?.toLocaleString?.('pt-BR') || '').replace(',', '')
    }

    static stringToDate = (date: String) => {
        let temp = date.split('/')
        return new Date(
            parseInt(temp[2]),
            parseInt(temp[1]) - 1,
            parseInt(temp[0])
        )
    }

    static stringToDateTime = (date: String) => {
        let tempDate = date.split(' ')[0].split('/')
        let tempTime = date.split(' ')[1].split(':')
        return new Date(
            parseInt(tempDate[2]),
            parseInt(tempDate[1]) - 1,
            parseInt(tempDate[0]),
            parseInt(tempTime[0]),
            parseInt(tempTime[1]),
            parseInt(tempTime[2])
        )
    }

    static betweenString = (value: string, start: string, end: string) => {
        return DateUtils.between(
            DateUtils.stringToDate(value),
            DateUtils.stringToDate(start),
            DateUtils.stringToDate(end)
        )
    }

    static between = (value: Date, start: Date, end: Date) => {
        return value >= start && value <= end
    }

    static daysBetween = (data1: string, data2: string) => {
        const date1 = DateUtils.stringToDate(data1)
        const date2 = DateUtils.stringToDate(data2)
        const diffEmMilissegundos = date1.getTime() - date2.getTime()
        const diffEmDias = Math.floor(
            diffEmMilissegundos / (1000 * 60 * 60 * 24)
        )

        return diffEmDias + 1
    }

    static stringToInputDate(date: string) {
        return (
            DateUtils.stringToDate(date)
                .getFullYear()
                .toString()
                .padStart(4, '0') +
            '-' +
            (DateUtils.stringToDate(date).getMonth() + 1)
                .toString()
                .padStart(2, '0') +
            '-' +
            DateUtils.stringToDate(date).getDate().toString().padStart(2, '0')
        )
    }

    static inputDateToString(value: string) {
        return (
            value.split('-')[2] +
            '/' +
            value.split('-')[1] +
            '/' +
            value.split('-')[0]
        )
    }
}
