import styled, { css } from 'styled-components'

import {
	getBorders,
	getBordersRadii,
	getColors,
	getFontWeights,
	getFonts,
	getIndents,
	getSizes,
} from 'utils/themeGetters'

export const Calendar = styled.div``

export const CalendarContainer = styled.div`
	width: ${(props) => getSizes(props, 8, -5)};
	border-radius: 8px;
	border: ${(props) => getBorders(props, 0)} solid ${(props) => getColors(props).border};
`
export const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	margin-bottom: 10px;
	padding: ${(props) => getIndents(props, 1, 2)};
`

export const ArrowIcon = styled.button`
	padding: 0;
	width: ${(props) => getSizes(props, 0, -8)};
	height: ${(props) => getSizes(props, 0, -8)};
	transition: color 0.3s;

	&:hover {
		cursor: pointer;
		color: ${(props) => getColors(props).holiday};
	}

	& > svg {
		height: 100%;
		width: 100%;
	}
`

export const DateItem = styled.button`
	&:hover {
		cursor: pointer;
	}
`

export const DaysGrid = styled.div<{ $showWeekends: boolean; $colsNumber: 2 | 3 | 5 | 7 }>`
	display: grid;
	grid-template-columns: ${({ $colsNumber }) => `repeat(${$colsNumber}, 1fr)`};
	grid-template-rows: repeat(5, 1fr);
	justify-items: center;
	padding: 0 ${(props) => getIndents(props, 1, 2)} ${(props) => getIndents(props, 1, 2)};
`

export const Day = styled.button<{
	$isCurrentMonth: boolean
	$isHoliday: boolean
	$isToday: boolean
	$notInRange: boolean
	$isFirstDayOfRange: boolean
	$isLastDayOfRange: boolean
	$isDateInCalendarRange?: boolean
}>`
	position: relative;
	width: ${(props) => getSizes(props, 1)};
	height: ${(props) => getSizes(props, 1)};
	padding: 0;
	border-radius: ${(props) => getBordersRadii(props, 4)};
	background-color: transparent;
	border: none;
	outline: none;
	transition: background-color 0.2s;
	color: ${(props) =>
		props.$isCurrentMonth ? getColors(props).colorText : getColors(props).inActive};

	&:hover {
		background-color: ${(props) => getColors(props).primary};

		${({ $notInRange }) =>
			$notInRange &&
			css`
				background-color: ${(props) => getColors(props).holiday};
				cursor: not-allowed;
			`}
	}

	${({ $isHoliday }) =>
		$isHoliday &&
		css`
			color: ${(props) => getColors(props).holiday};
		`}

	${({ $isDateInCalendarRange }) =>
		$isDateInCalendarRange &&
		css`
			background-color: ${(props) => getColors(props).range};
		`} 

		${({ $isFirstDayOfRange }) =>
		$isFirstDayOfRange &&
		css`
			background-color: ${(props) => getColors(props).rangeStart};
		`}
		${({ $isLastDayOfRange }) =>
		$isLastDayOfRange &&
		css`
			background-color: ${(props) => getColors(props).primary};
		`}
		${({ $isToday }) =>
		$isToday &&
		css`
			background-color: ${(props) => getColors(props).secondary};
		`}
`

export const DayDate = styled.p``

export const DayBadge = styled.span`
	position: absolute;
	top: 0;
	right: 0;
	font-size: ${(props) => getFonts(props, 0, -4)};
`

export const WeekDays = styled.div`
	display: flex;
	font-weight: ${(props) => getFontWeights(props, 3)};
	margin-bottom: ${(props) => getIndents(props, 0, 1)};
	padding: 0 ${(props) => getIndents(props, 1, 2)};
`

export const WeekDay = styled.p`
	flex: 1 0 auto;
	margin: 0;
	text-align: center;
	width: ${(props) => getSizes(props, 1)};
`

export const MonthOrYear = styled.button<{
	$notInRange: boolean
}>`
	padding: ${(props) => getIndents(props, 0, 1)};
	cursor: pointer;
	border-radius: ${(props) => getBordersRadii(props, 2)};
	transition: background-color 0.3s;

	&:hover {
		background-color: ${(props) => getColors(props).primary};
	}

	&:hover {
		${({ $notInRange }) =>
			$notInRange &&
			css`
				background-color: ${(props) => getColors(props).holiday};
				cursor: not-allowed;
			`}
	}
`

export const ClearBtn = styled.button`
	display: block;
	width: 100%;
	text-align: center;
	border-top: ${(props) => getBorders(props, 0)} solid ${(props) => getColors(props).border};
	border-radius: 0 0 ${(props) => getBordersRadii(props, 4)} ${(props) => getBordersRadii(props, 4)};
	padding: ${(props) => getIndents(props, 1, 2)} 0px;
`
