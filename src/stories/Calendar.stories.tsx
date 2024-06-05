import React, { useState } from 'react'

import DateInput from 'components/DateInput'
import { ErrorBoundary } from 'components/ErrorBoundary'
import { inputFallbackMsg } from 'src/stories/config'
import { Container, FallbackMsg } from 'src/stories/styled'

import { StateType } from './types'

export function CalendarDemo() {
	const [minDate, setMinDate] = useState<StateType>(new Date(2024, 4, 1))
	const [maxDate, setMaxDate] = useState<StateType>(new Date(2024, 4, 24))
	const [rangeFrom, setRangeFrom] = useState<StateType>(new Date(2024, 4, 24))
	const [rangeTo, setRangeTo] = useState<StateType>(new Date(2024, 4, 24))

	const handleSelectMinDate = (nextDate?: Date) => {
		setMinDate(nextDate)
	}
	const handleSelectMaxDate = (nextDate?: Date) => {
		setMaxDate(nextDate)
	}
	const handleSelectRangeFrom = (nextDate?: Date) => {
		setRangeFrom(nextDate)
	}
	const handleSelectRangeTo = (nextDate?: Date) => {
		setRangeTo(nextDate)
	}

	return (
		<Container>
			<ErrorBoundary fallback={<FallbackMsg>{inputFallbackMsg}</FallbackMsg>}>
				<DateInput date={minDate} onChange={handleSelectMinDate} title="Date" />
			</ErrorBoundary>
			<ErrorBoundary fallback={<FallbackMsg>{inputFallbackMsg}</FallbackMsg>}>
				<DateInput date={maxDate} onChange={handleSelectMaxDate} title="Date" />
			</ErrorBoundary>
			<ErrorBoundary fallback={<FallbackMsg>{inputFallbackMsg}</FallbackMsg>}>
				<DateInput
					date={rangeFrom}
					onChange={handleSelectRangeFrom}
					min={minDate}
					max={maxDate}
					from={rangeFrom}
					to={rangeTo}
					title="From"
				/>
			</ErrorBoundary>
			<ErrorBoundary fallback={<FallbackMsg>{inputFallbackMsg}</FallbackMsg>}>
				<DateInput
					date={rangeTo}
					min={minDate}
					max={maxDate}
					from={rangeFrom}
					to={rangeTo}
					onChange={handleSelectRangeTo}
					title="To"
				/>
			</ErrorBoundary>
		</Container>
	)
}

export default {}
