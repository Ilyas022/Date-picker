import styled, { css } from 'styled-components'

import {
	getBordersRadii,
	getColors,
	getFontWeights,
	getIndents,
	getSizes,
} from 'utils/themeGetters'

export const Calendar = styled.div``

export const CalendarContainer = styled.div`
	width: 250px;
	height: 241px;
	border-radius: 8px;
	border: 1px solid #e1e1e1;
	padding: 10px;
`
export const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
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

export const Month = styled.button`
	&:hover {
		cursor: pointer;
	}
`

export const DaysGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	grid-template-rows: repeat(5, 1fr);
`

export const Day = styled.button<{
	$isCurrentMonth: boolean
	$isHoliday: boolean
	$isToday: boolean
}>`
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

export const WeekDays = styled.div`
	display: flex;
	font-weight: ${(props) => getFontWeights(props, 3)};
	margin-bottom: ${(props) => getIndents(props, 0, 1)};
`

export const WeekDay = styled.p`
	flex: 1 0 auto;
	padding: 0 ${(props) => getIndents(props, 0, -1)} 0 0;
	margin: 0;
	text-align: center;
	width: ${(props) => getSizes(props, 1)};
`
