export enum WeekStartDay {
	monday = 6,
	sunday = 0,
}

export type FirstDayOfWeekType = WeekStartDay.monday | WeekStartDay.sunday

export enum ChangeTypes {
	inc = 'inc',
	dec = 'dec',
}

export enum EntityTypes {
	years = 'years',
	months = 'months',
	days = 'days',
}

export enum RangeTypes {
	from = 0,
	to = 1,
}
