import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'

import Item from 'components/Item'
import { theme } from 'constants/theme'
import { GlobalStyles } from 'src/styles/global.styles'

import '../../styles/index.css'

import { Container } from './styled'

function CalendarContainer() {
	const [minDate, setMinDate] = useState<Date>(new Date(2024, 4, 1))
	const [maxDate, setMaxDate] = useState<Date>(new Date(2024, 4, 24))
	const [date, setDate] = useState<Date>(() => new Date())

	const handleChangeDate = (nextDate: Date) => {
		setDate(nextDate)
	}
	const handleSelectMinDate = (nextDate: Date) => {
		setMinDate(nextDate)
	}
	const handleSelectMaxDate = (nextDate: Date) => {
		setMaxDate(nextDate)
	}

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<Container>
				<Item title="Range min" date={minDate} setDate={handleSelectMinDate} />
				<Item title="Range max" date={maxDate} setDate={handleSelectMaxDate} />
				<Item title="Date" date={date} setDate={handleChangeDate} min={minDate} max={maxDate} />
			</Container>
		</ThemeProvider>
	)
}

export default CalendarContainer
