export type RangeCalendarItemProps = {
	title: string
	min?: Date
	max?: Date
	from: Date
	to: Date
	typeOfRange: 0 | 1
	setFrom: (currDate: Date) => void
	setTo: (currDate: Date) => void
}
