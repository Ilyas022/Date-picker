export interface CalendarItemProps {
	date?: Date
	min?: Date
	max?: Date
	from?: Date
	to?: Date
	setDate: (currDate?: Date) => void
}
