// Theme
interface ThemeColors {
	primary: string
	secondary: string
	primaryBgGradient: string
	secondaryBgGradient: string
	popUpBg: string
	error: string
	btn: string
	textGradient: string
	dark: string
	white: string
	textPrimary: string
	textSecondary: string
	textTertiary: string
	textDark: string
	icon: string
	iconBg: string
	cardBorder: string
	cardBg: string
	chartGrid: string
	selectBg: string
	selectHover: string
}

export interface Theme {
	name: 'light' | 'dark'
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

// Response

export interface ResponseMeta {
	last_updated_at: string
}

export interface ResponseDataItem {
	code: string
	value: number
	label: string
}

export interface Response {
	meta: ResponseMeta
	data: ResponseDataItem[]
}

export interface CurrencyExchangeList {
	[key: string]: ResponseDataItem[]
}

export interface HistoryResponseItem {
	time_open: string
	price_open: number
	price_high: number
	price_low: number
	price_close: number
}

export interface HistoryResponseResult {
	[key: string]: HistoryResponseItem[]
}

// Select
export interface SelectOption {
	label: string
	value: string | number
}

// Thunks
export interface CurrencyExchangeProps {
	[key: string]: ResponseDataItem[]
}

export interface CurrencyListProps {
	data: ResponseDataItem[]
	currency: string
	updatedAt: string
}

export interface HistoryThunkArgs {
	date: string
	currency: string
}
