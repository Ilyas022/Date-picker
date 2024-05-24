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
