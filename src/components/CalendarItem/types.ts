interface Day {
	day: number
	month: number
	year: number
	isToday: boolean
	isHoliday: boolean
	isCurrentMonth: boolean
}

export type DaysArray = Day[]

export enum ChangeTypes {
	inc = 'inc',
	dec = 'dec',
}
