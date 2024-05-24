import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'

import CalendarItem from 'components/CalendarItem'
import DateInput from 'components/DateInput'
import { theme } from 'constants/theme'
import { GlobalStyles } from 'src/styles/global.styles'

import '../../styles/index.css'

function CalendarContainer() {
	const [date, setDate] = useState<Date>(() => new Date())
	const handleChangeDate = (nextDate: Date) => {
		setDate(nextDate)
	}

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<DateInput value={date} onChange={handleChangeDate} />
			<CalendarItem date={date} setDate={(newDate) => setDate(newDate)} />
		</ThemeProvider>
	)
}

export default CalendarContainer
