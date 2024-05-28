import { ChangeTypes } from 'types/calendarTypes'

export interface HeaderProps {
	handleChangeMonth: (type: keyof typeof ChangeTypes) => void
	handleChangeView: () => void
	dateToShow: string | number | undefined
}
