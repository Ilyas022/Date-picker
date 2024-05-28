import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'

import '../../styles/index.css'

import NotRangeCalendarItem from 'components/NotRangeCalendarItem'
import RangeCalendarItem from 'components/RangeItem'
import { theme } from 'constants/theme'
import { GlobalStyles } from 'src/styles/global.styles'
import { RangeTypes } from 'types/calendarTypes'

import { Container } from './styled'

function CalendarContainer() {
	const [minDate, setMinDate] = useState<Date>(new Date(2024, 4, 1))
	const [maxDate, setMaxDate] = useState<Date>(new Date(2024, 4, 24))
	const [rangeFrom, setRangeFrom] = useState<Date>(new Date(2024, 4, 24))
	const [rangeTo, setRangeTo] = useState<Date>(new Date(2024, 4, 24))

	const handleSelectMinDate = (nextDate: Date) => {
		setMinDate(nextDate)
	}
	const handleSelectMaxDate = (nextDate: Date) => {
		setMaxDate(nextDate)
	}
	const handleSelectRangeFrom = (nextDate: Date) => {
		setRangeFrom(nextDate)
	}
	const handleSelectRangeTo = (nextDate: Date) => {
		setRangeTo(nextDate)
	}

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<Container>
				<NotRangeCalendarItem title="Range min" date={minDate} setDate={handleSelectMinDate} />
				<NotRangeCalendarItem title="Range max" date={maxDate} setDate={handleSelectMaxDate} />
				<RangeCalendarItem
					title="Date from"
					typeOfRange={RangeTypes.from}
					setFrom={handleSelectRangeFrom}
					setTo={handleSelectRangeTo}
					min={minDate}
					max={maxDate}
					from={rangeFrom}
					to={rangeTo}
				/>
				<RangeCalendarItem
					title="Date to"
					typeOfRange={RangeTypes.to}
					setFrom={handleSelectRangeFrom}
					setTo={handleSelectRangeTo}
					min={minDate}
					max={maxDate}
					from={rangeFrom}
					to={rangeTo}
				/>
			</Container>
		</ThemeProvider>
	)
}

export default CalendarContainer
