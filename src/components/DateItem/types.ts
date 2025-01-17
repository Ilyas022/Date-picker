export interface DayProps {
	currentDate: Date
	calendar: Date
	min?: Date
	max?: Date
	from?: Date
	to?: Date
	date: Date
	handleClick: (date: Date) => void
}

export type BadgeType = string | number | null
