interface BaseType {
	calendar: Date
	date: Date
	data: Date[]
	min: Date | undefined
	max: Date | undefined
	from: Date
	to: Date | undefined
}

interface CalendarDataDay extends BaseType {
	view: 'days'
	handleDayClick: (date: Date) => void
}
interface CalendarDataMonth extends BaseType {
	view: 'months'

	handleYearOrMonthClick: (date: Date) => void
}
interface CalendarDataYear extends BaseType {
	view: 'years'

	handleYearOrMonthClick: (date: Date) => void
}

export type CalendarDataProps = CalendarDataDay | CalendarDataMonth | CalendarDataYear
