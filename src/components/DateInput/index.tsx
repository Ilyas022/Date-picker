import React, { useEffect, useRef, useState } from 'react'
import { ThemeProvider } from 'styled-components'

import CalendarItem from 'components/CalendarItem'
import { theme } from 'constants/theme'
import useOnClickOutside from 'hooks/useOnClickOutside'
import { GlobalStyles } from 'src/styles/global.styles'
import { getDateFromInputValue, getInputValueFromDate, isInRange } from 'utils/getDays'

import {
	Button,
	CalendarIcon,
	CalendarIconWrapper,
	Container,
	CrossIcon,
	Input,
	InputItem,
	Title,
} from './styled'
import { DateInputProps } from './types'

function DateInput({
	date,
	onChange,
	min,
	max,
	from,
	to,
	title,
	disableClear = false,
}: DateInputProps) {
	const [inputValue, setInputValue] = useState('')
	const [error, setError] = useState(false)
	const [calendarOpen, setCalendarOpen] = useState(false)

	useEffect(() => {
		setInputValue(getInputValueFromDate(date))
	}, [date])

	const ref = useRef(null)
	useOnClickOutside(ref, () => {
		setCalendarOpen(false)
	})

	const updateValue = () => {
		const dateFromInput = getDateFromInputValue(inputValue)
		if (!dateFromInput && date) {
			setInputValue(getInputValueFromDate(date))
			return
		}

		const isDateInRange = isInRange(dateFromInput, min, max)

		if (!isDateInRange) {
			setError(true)
			return
		}

		setError(false)
		onChange(dateFromInput)
	}

	const onKeyDown = (e: React.KeyboardEvent) => {
		if (e.key !== 'Enter') {
			return
		}
		updateValue()
	}

	const onBlur = () => {
		updateValue()
		setCalendarOpen(false)
	}

	const handleClear = () => {
		onChange(undefined)
	}

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<Container ref={ref}>
				<Title>{title}</Title>
				<InputItem $error={error}>
					<CalendarIconWrapper onClick={() => setCalendarOpen((prev) => !prev)}>
						<CalendarIcon />
					</CalendarIconWrapper>
					<Input
						onKeyDown={onKeyDown}
						value={inputValue}
						onChange={(e) => {
							setInputValue(e.target.value.trim())
						}}
						onBlur={onBlur}
					/>
					<Button type="button" disabled={disableClear} onClick={handleClear}>
						<CrossIcon />
					</Button>
				</InputItem>
				{calendarOpen && (
					<CalendarItem
						date={date}
						min={min}
						max={max}
						from={from}
						to={to}
						setDate={(currDate?: Date) => onChange(currDate)}
					/>
				)}
			</Container>
		</ThemeProvider>
	)
}

export default DateInput
