import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'

import '../../styles/index.css'

import CalendarItem from 'components/CalendarItem'
import DateInput from 'components/DateInput'
import { ErrorBoundary } from 'components/ErrorBoundary'
import Togglers from 'components/Togglers'
import { theme } from 'constants/theme'
import { GlobalStyles } from 'src/styles/global.styles'
import { EntityTypes, FirstDayOfWeekType } from 'types/calendarTypes'

import { calendarFallbackMsg, inputFallbackMsg, togglersFallbackMsg } from './config'
import { Container } from './styled'

function CalendarContainer() {
	const [minDate, setMinDate] = useState<Date | undefined>(new Date(2024, 4, 1))
	const [maxDate, setMaxDate] = useState<Date | undefined>(new Date(2024, 4, 24))
	const [rangeFrom, setRangeFrom] = useState<Date>(new Date(2024, 4, 24))
	const [rangeTo, setRangeTo] = useState<Date | undefined>(new Date(2024, 4, 24))

	const [calendarView, setCalendarView] = useState<'years' | 'months' | 'days'>(EntityTypes.days)
	const [showWeekends, setShowWeekends] = useState(true)
	const [firstDayOfWeek, setFirstDayOfWeek] = useState<FirstDayOfWeekType>(6)

	const handleSelectMinDate = (nextDate: Date | undefined) => {
		setMinDate(nextDate)
	}
	const handleSelectMaxDate = (nextDate: Date | undefined) => {
		setMaxDate(nextDate)
	}
	const handleSelectRangeFrom = (nextDate: Date) => {
		setRangeFrom(nextDate)
	}
	const handleSelectRangeTo = (nextDate: Date | undefined) => {
		setRangeTo(nextDate)
	}

	const handleWeekendsChange = () => {
		setShowWeekends((prev) => !prev)
	}

	const handleFirstDayOfWeekChange = () => {
		if (firstDayOfWeek === 6) {
			return setFirstDayOfWeek(0)
		}
		return setFirstDayOfWeek(6)
	}

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<Container>
				<ErrorBoundary fallback={<p>{inputFallbackMsg}</p>}>
					<DateInput value={minDate} onChange={handleSelectMinDate} title="Date" />
				</ErrorBoundary>
				<ErrorBoundary fallback={<p>{inputFallbackMsg}</p>}>
					<DateInput value={maxDate} onChange={handleSelectMaxDate} title="Date" />
				</ErrorBoundary>
				<ErrorBoundary fallback={<p>{inputFallbackMsg}</p>}>
					<DateInput value={rangeFrom} onChange={handleSelectRangeFrom} disableClear title="From" />
				</ErrorBoundary>
				<ErrorBoundary fallback={<p>{inputFallbackMsg}</p>}>
					<DateInput value={rangeTo} onChange={handleSelectRangeTo} title="To" />
				</ErrorBoundary>

				<ErrorBoundary fallback={<p>{togglersFallbackMsg}</p>}>
					{calendarView === EntityTypes.days && (
						<Togglers
							firstDayOfWeek={firstDayOfWeek}
							showWeekends={showWeekends}
							handleWeekendsChange={handleWeekendsChange}
							handleFirstDayOfWeekChange={handleFirstDayOfWeekChange}
						/>
					)}
				</ErrorBoundary>
				<ErrorBoundary fallback={<p>{calendarFallbackMsg}</p>}>
					<CalendarItem
						firstDayOfWeek={firstDayOfWeek}
						date={rangeFrom}
						setFrom={handleSelectRangeFrom}
						setTo={handleSelectRangeTo}
						min={minDate}
						max={maxDate}
						from={rangeFrom}
						to={rangeTo}
						showWeekends={showWeekends}
						view={calendarView}
						setView={setCalendarView}
					/>
				</ErrorBoundary>
			</Container>
		</ThemeProvider>
	)
}

export default CalendarContainer
