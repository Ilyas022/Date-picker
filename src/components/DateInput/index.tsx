import React, { useEffect, useState } from 'react'

import { getDateFromInputValue, getInputValueFromDate, isInRange } from 'utils/getDays'

import { CalendarIcon, CalendarIconWrapper, CrossIcon, Input, InputItem } from './styled'

function DateInput({
	value,
	onChange,
	openCalendar,
	min,
	max,
}: {
	value: Date
	onChange: (date: Date) => void
	openCalendar: () => void
	min?: Date
	max?: Date
}) {
	const [inputValue, setInputValue] = useState('')
	const [error, setError] = useState(false)

	useEffect(() => {
		setInputValue(getInputValueFromDate(value))
	}, [value])

	const updateValue = () => {
		const date = getDateFromInputValue(inputValue)
		if (!date) {
			setInputValue(getInputValueFromDate(value))
			return
		}

		const isDateInRange = isInRange(date, min, max)

		if (!isDateInRange) {
			setError(true)
			return
		}

		setError(false)
		onChange(date)
	}

	const onKeyDown = (e: React.KeyboardEvent) => {
		if (e.key !== 'Enter') {
			return
		}

		updateValue()
	}

	const onBlur = () => {
		updateValue()
	}

	return (
		<InputItem $error={error}>
			<CalendarIconWrapper onClick={openCalendar}>
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
			<CrossIcon />
		</InputItem>
	)
}

export default DateInput
