const TIME_COEF = 3600 * 24 * 180

export class DateUtils {
	static dateToString = (dt: Date) => {
		const date = new Date(dt.getTime() + TIME_COEF)
		const day = date.getDate().toString().padStart(2, '0')
		const month = (date.getMonth() + 1).toString().padStart(2, '0')
		const year = date.getFullYear()

		return `${day}/${month}/${year}`
	}

	static timeToString = (date: Date) => {
		const hour = date.getHours().toString().padStart(2, '0')
		const minutes = date.getMinutes().toString().padStart(2, '0')
		const seconds = date.getSeconds().toString().padStart(2, '0')

		return `${hour}:${minutes}:${seconds}`
	}

	static dateTimeToString = (date: Date) => {
		return `${this.dateToString(date)} ${this.timeToString(date)}`
	}

	static stringToDate = (date: string) => {
		const parts = date.split('/')
		const day = parseInt(parts[0], 10)
		const month = parseInt(parts[1], 10) - 1
		const year = parseInt(parts[2], 10)
		return new Date(new Date(year, month, day).getTime() + TIME_COEF)
	}

	static numberToTimeString = (time: number | null) => {
		const seconds = time || 0
		const hours = Math.floor(seconds / 3600)
		const minutes = Math.floor((seconds % 3600) / 60)
		const secs = seconds % 60

		const formattedHours = String(hours).padStart(2, '0')
		const formattedMinutes = String(minutes).padStart(2, '0')
		const formattedSeconds = String(secs).padStart(2, '0')

		return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
	}

	static stringTimeToNumber = (time: string) => {
		const [hours, minutes, seconds] = time.split(':').map(Number)
		return hours * 3600 + minutes * 60 + seconds
	}

	static stringToDateTime = (date: string) => {
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
		const diffInMilliseconds = date1.getTime() - date2.getTime()
		const diffEmDias = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24))

		return diffEmDias + 1
	}
}
