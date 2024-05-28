// Theme
interface ThemeColors {
	primary: string
	secondary: string
	range: string
	rangeStart: string
	holiday: string
	border: string
	colorText: string
	inActive: string
	shadow: string
	popUpBg: string
	white: string
}

export interface Theme {
	fonts: number[]
	fontWeights: number[]
	lineHeights: number[]
	colors: ThemeColors
	sizes: number[]
	gaps: number[]
	indents: number[]
	borders: number[]
	bordersRadii: number[]
}

export enum WeekStartDay {
	monday = 6,
	sunday = 0,
}

export type FirstDayOfWeekType = WeekStartDay.monday | WeekStartDay.sunday
