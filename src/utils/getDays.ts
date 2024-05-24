function isHoliday(date: Date) {
	const holidays = [
		new Date(2024, 0, 1), // Новый год
		new Date(2024, 0, 2), // Новый год
		new Date(2024, 0, 7), // Рождество Христово (православное Рождество)
		new Date(2024, 2, 8), // Международный женский день
		new Date(2024, 4, 1), // Праздник труда
		new Date(2024, 4, 9), // День Победы
		new Date(2024, 4, 14), // Радуница
		new Date(2024, 6, 3), // День Независимости Республики Беларусь
		new Date(2024, 10, 7), // День Октябрьской революции
		new Date(2024, 11, 25), // – Рождество Христово (католическое Рождество)
	]

	for (let i = 0; i < holidays.length; i++) {
		if (date.getMonth() === holidays[i].getMonth() && date.getDate() === holidays[i].getDate()) {
			return true
		}
	}
	return false
}

export const isToday = (today: Date, date: Date) => {
	return (
		today.getDate() === date.getDate() &&
		today.getMonth() === date.getMonth() &&
		today.getFullYear() === date.getFullYear()
	)
}
const SundayToSaturdayWeek: Record<number, number> = {
	0: 6,
	1: 0,
	2: 1,
	3: 2,
	4: 3,
	5: 4,
	6: 5,
}

const getDayOfTheWeek = (date: Date) => {
	const day = date.getDay()
	return SundayToSaturdayWeek[day]
}

export const getDaysAmountInAMonth = (year: number, month: number) => {
	const nextMonthDate = new Date(year, month + 1, 0)
	return nextMonthDate.getDate()
}

export const getPreviousMonthDays = (year: number, month: number) => {
	const currentMonthFirstDay = new Date(year, month, 1)
	const prevMonthDaysAmount = getDayOfTheWeek(currentMonthFirstDay)
	const daysAmountInPrevMonth = getDaysAmountInAMonth(year, month - 1)
	const prevMonthDays = []
	const [dateYear, dateMonth] = month === 0 ? [year - 1, 11] : [year, month - 1]

	for (let i = prevMonthDaysAmount - 1; i >= 0; i--) {
		prevMonthDays.push({
			year: dateYear,
			month: dateMonth,
			day: daysAmountInPrevMonth - i,
			isToday: false,
			isCurrentMonth: false,
			isHoliday: isHoliday(new Date(dateYear, dateMonth, daysAmountInPrevMonth - i)),
		})
	}

	return prevMonthDays
}

export const getCurrentMothDays = (date: Date, numberOfDays: number) => {
	const month = date.getMonth()
	const year = date.getFullYear()
	const dateCells = []

	for (let i = 1; i <= numberOfDays; i++) {
		dateCells.push({
			year,
			month,
			day: i,
			isToday: isToday(date, new Date(year, month, i)),
			isCurrentMonth: true,
			isHoliday: isHoliday(new Date(year, month, i)),
		})
	}

	return dateCells
}

export const getNextMonthDays = (year: number, month: number) => {
	const currentMonthFirstDay = new Date(year, month, 1)
	const prevMonthCellsAmount = getDayOfTheWeek(currentMonthFirstDay)

	const daysAmount = getDaysAmountInAMonth(year, month)

	const nextMonthDays = 35 - daysAmount - prevMonthCellsAmount

	const [dateYear, dateMonth] = month === 11 ? [year + 1, 0] : [year, month + 1]

	const dateCells = []

	for (let i = 1; i <= nextMonthDays; i++) {
		dateCells.push({
			year: dateYear,
			month: dateMonth,
			day: i,

			isToday: false,
			isCurrentMonth: false,
			isHoliday: isHoliday(new Date(dateYear, dateMonth, i)),
		})
	}

	return dateCells
}

export function generateCalendar(startDate: Date) {
	const year = startDate.getFullYear()
	const month = startDate.getMonth()
	const numberOfDays = getDaysAmountInAMonth(year, month)
	const prevMonth = getPreviousMonthDays(year, month)
	const currenMonth = getCurrentMothDays(startDate, numberOfDays)
	const nextMonth = getNextMonthDays(year, month)
	const calendar = [...prevMonth, ...currenMonth, ...nextMonth]

	return calendar
}

const validValueRegex = /^\d{2}\/\d{2}\/\d{4}$/

export const isValidDateString = (value: string) => {
	if (!validValueRegex.test(value)) {
		return false
	}
	const [date, month, year] = value.split('/').map((v) => parseInt(v, 10))

	if (month < 1 || month > 12 || date < 1) {
		return false
	}

	const maxDaysInAMonth = getDaysAmountInAMonth(year, month - 1)

	if (date > maxDaysInAMonth) {
		return false
	}

	return true
}

const addLeadingZeroIfNeeded = (value: number) => {
	if (value > 9) {
		return value.toString()
	}

	return `0${value}`
}

export const getInputValueFromDate = (value: Date) => {
	const date = addLeadingZeroIfNeeded(value.getDate())
	const month = addLeadingZeroIfNeeded(value.getMonth() + 1)
	const year = value.getFullYear()

	return `${date}/${month}/${year}`
}

export const getDateFromInputValue = (inputValue: string) => {
	if (!isValidDateString(inputValue)) {
		return
	}

	const [date, month, year] = inputValue.split('/').map((v) => parseInt(v, 10))

	const dateObj = new Date(year, month - 1, date)
	// eslint-disable-next-line consistent-return
	return dateObj
}
