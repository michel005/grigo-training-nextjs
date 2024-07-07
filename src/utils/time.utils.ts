export class TimeUtils {
    static literalTime = (time: string = '00:00:00') => {
        const [hour, minutes, seconds] = time.split(':')

        const parsedHour = parseInt(hour, 10)
        const parsedMinutes = parseInt(minutes, 10)
        const parsedSeconds = parseInt(seconds, 10)

        const result = []
        if (parsedHour > 0) {
            result.push(
                parsedHour === 1 ? `${parsedHour} hora` : `${parsedHour} horas`
            )
        }
        if (parsedMinutes > 0) {
            result.push(
                parsedMinutes === 1
                    ? `${parsedMinutes} minuto`
                    : `${parsedMinutes} minutos`
            )
        }
        if (parsedSeconds > 0) {
            result.push(
                parsedSeconds === 1
                    ? `${parsedSeconds} segundo`
                    : `${parsedSeconds} segundos`
            )
        }

        if (result.length === 3) {
            return `${result[0]}, ${result[1]} e ${result[2]}`
        }
        if (result.length === 2) {
            return `${result[0]} e ${result[1]}`
        }
        return result[0]
    }

    static reducedLiteralName = (time: string = '00:00:00') => {
        return this.literalTime(time)
            .replace(' horas', 'h')
            .replace(' hora', 'h')
            .replace(' minutos', 'min')
            .replace(' minuto', 'min')
            .replace(' segundos', 's')
            .replace(' segundo', 's')
    }
}
