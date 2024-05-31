import { EntityTypes, FirstDayOfWeekType, WeekStartDay } from 'types/calendarTypes'

function isBiggerThanDate(value: Date, date: Date) {
	if (value.getFullYear() > date.getFullYear()) {
		return true
	}

	if (value.getFullYear() < date.getFullYear()) {
		return false
	}

	if (value.getMonth() > date.getMonth()) {
		return true
	}

	if (value.getMonth() < date.getMonth()) {
		return false
	}

	return value.getDate() >= date.getDate()
}

function isSmallerThanDate(value: Date, date: Date) {
	if (value.getFullYear() > date.getFullYear()) {
		return false
	}

	if (value.getFullYear() < date.getFullYear()) {
		return true
	}

	if (value.getMonth() > date.getMonth()) {
		return false
	}

	if (value.getMonth() < date.getMonth()) {
		return true
	}

	return value.getDate() <= date.getDate()
}

export function isInRange(value: Date | undefined, min?: Date, max?: Date) {
	if (!value) return false
	if (min && max) {
		return isSmallerThanDate(value, max) && isBiggerThanDate(value, min)
	}

	if (min) {
		return isBiggerThanDate(value, min)
	}

	if (max) {
		return isSmallerThanDate(value, max)
	}

	return true
}

export const isHoliday = (date: Date) => {
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
const MondayToSundayWeek: Record<number, number> = {
	0: 6,
	1: 0,
	2: 1,
	3: 2,
	4: 3,
	5: 4,
	6: 5,
}
const SundayToSaturdayWeek: Record<number, number> = {
	0: 0,
	1: 1,
	2: 2,
	3: 3,
	4: 4,
	5: 5,
	6: 6,
}

export const isCurrentMonth = (today: Date, date: Date) => {
	return today.getMonth() === date.getMonth() && today.getFullYear() === date.getFullYear()
}

const getDayOfTheWeek = (date: Date, firstDay: 0 | 6) => {
	const day = date.getDay()
	if (firstDay === WeekStartDay.monday) {
		return MondayToSundayWeek[day]
	}
	return SundayToSaturdayWeek[day]
}

export const getDaysAmountInAMonth = (year: number, month: number) => {
	const nextMonthDate = new Date(year, month + 1, 0)
	return nextMonthDate.getDate()
}

export const getPreviousMonthDays = (year: number, month: number, firstDay: FirstDayOfWeekType) => {
	const currentMonthFirstDay = new Date(year, month, 1)
	const prevMonthDaysAmount = getDayOfTheWeek(currentMonthFirstDay, firstDay)
	const daysAmountInPrevMonth = getDaysAmountInAMonth(year, month - 1)
	const prevMonthDays = []
	const [dateYear, dateMonth] = month === 0 ? [year - 1, 11] : [year, month - 1]

	for (let i = prevMonthDaysAmount - 1; i >= 0; i--) {
		const currentDate = new Date(dateYear, dateMonth, daysAmountInPrevMonth - i)
		prevMonthDays.push(currentDate)
	}

	return prevMonthDays
}

export const getCurrentMothDays = (date: Date, numberOfDays: number) => {
	const month = date.getMonth()
	const year = date.getFullYear()
	const dateCells = []

	for (let i = 1; i <= numberOfDays; i++) {
		const currentDate = new Date(year, month, i)
		dateCells.push(currentDate)
	}

	return dateCells
}

export const getNextMonthDays = (year: number, month: number, firstDay: FirstDayOfWeekType) => {
	const currentMonthFirstDay = new Date(year, month, 1)
	const prevMonthCellsAmount = getDayOfTheWeek(currentMonthFirstDay, firstDay)

	const daysAmount = getDaysAmountInAMonth(year, month)

	const nextMonthDays = 35 - daysAmount - prevMonthCellsAmount

	const [dateYear, dateMonth] = month === 11 ? [year + 1, 0] : [year, month + 1]

	const dateCells = []

	for (let i = 1; i <= nextMonthDays; i++) {
		const currentDate = new Date(dateYear, dateMonth, i)
		dateCells.push(currentDate)
	}

	return dateCells
}

export function generateCalendarDays(
	startDate: Date,
	showWeekends: boolean,
	firstDay: FirstDayOfWeekType
) {
	const dateYear = startDate.getFullYear()
	const dateMonth = startDate.getMonth()
	const numberOfDays = getDaysAmountInAMonth(dateYear, dateMonth)
	const prevMonth = getPreviousMonthDays(dateYear, dateMonth, firstDay)
	const currenMonth = getCurrentMothDays(startDate, numberOfDays)
	const nextMonth = getNextMonthDays(dateYear, dateMonth, firstDay)
	const calendar = [...prevMonth, ...currenMonth, ...nextMonth]

	if (!showWeekends) {
		return calendar.filter((date: Date) => {
			const dayOfWeek = date.getDay()
			return dayOfWeek !== 0 && dayOfWeek !== 6 // Исключаем воскресенье (0) и субботу (6)
		})
	}

	return calendar
}

export const generateCalendarMonths = (date: Date) => {
	const monthsArray = []
	const day = date.getDate()
	const year = date.getFullYear()

	for (let i = 0; i < 12; i++) {
		monthsArray.push(new Date(year, i, day))
	}
	return monthsArray
}

export const generateCalendarYears = (date: Date) => {
	const day = date.getDate()
	const month = date.getMonth()
	const year = date.getFullYear()

	const halfSize = 7
	const yearsArray = []

	for (let i = halfSize; i > 0; i--) {
		const currentDate = new Date(year - i, month, day)
		yearsArray.push(currentDate)
	}

	yearsArray.push(new Date(year, month, day))

	for (let i = 1; i <= halfSize; i++) {
		const currentDate = new Date(year + i, month, day)
		yearsArray.push(currentDate)
	}

	return yearsArray
}

const validRegex = /^\d{2}\/\d{2}\/\d{4}$/

export const isValidDateString = (value: string) => {
	if (!validRegex.test(value)) {
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

export const getInputValueFromDate = (value?: Date) => {
	if (value) {
		const date = addLeadingZeroIfNeeded(value.getDate())
		const month = addLeadingZeroIfNeeded(value.getMonth() + 1)
		const year = value.getFullYear()

		return `${date}/${month}/${year}`
	}
	return ''
}

export const getDateFromInputValue = (inputValue: string) => {
	if (!isValidDateString(inputValue)) {
		return
	}

	const [date, month, year] = inputValue.split('/').map((v) => parseInt(v, 10))

	const dateObj = new Date(year, month - 1, date)
	return dateObj
}

export const getDateToShow = (date: Date, view: 'years' | 'months' | 'days') => {
	if (view === EntityTypes.years) {
		return 'Years'
	}
	if (view === EntityTypes.months) {
		return date.getFullYear()
	}
	if (view === EntityTypes.days) {
		const currentMonth = date.toLocaleDateString('en', { month: 'long' })
		const currentYear = date.getFullYear()
		return `${currentMonth} ${currentYear}`
	}

	return undefined
}
