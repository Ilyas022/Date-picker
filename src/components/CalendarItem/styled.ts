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
	height: ${(props) => getSizes(props, 8, -14)};
	border-radius: 8px;
	border: ${(props) => getBorders(props, 0)} solid #e1e1e1;
	padding: ${(props) => getIndents(props, 1, 2)};
`
export const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	margin-bottom: 10px;
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

export const DaysGrid = styled.div<{ $showWeekends: boolean; $threeCols: boolean }>`
	display: grid;
	grid-template-columns: ${({ $showWeekends }) =>
		$showWeekends ? 'repeat(7, 1fr)' : 'repeat(5, 1fr)'};
	grid-template-rows: repeat(5, 1fr);

	${({ $threeCols }) =>
		$threeCols &&
		css`
			grid-template-columns: repeat(3, 1fr);
			gap: 10px;
			padding: 10px;
			font-size: 14px;
		`}
	justify-items: center;
`

export const Day = styled.button<{
	$isCurrentMonth: boolean
	$isHoliday: boolean
	$isToday: boolean
	$notInRange: boolean
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

	${({ $isToday }) =>
		$isToday &&
		css`
			background-color: ${(props) => getColors(props).secondary};
		`}

	${({ $isHoliday }) =>
		$isHoliday &&
		css`
			color: ${(props) => getColors(props).holiday};
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
