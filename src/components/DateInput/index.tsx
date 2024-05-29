import React, { useEffect, useState } from 'react'

import { getDateFromInputValue, getInputValueFromDate, isInRange } from 'utils/getDays'

import { Button, CalendarIcon, CalendarIconWrapper, CrossIcon, Input, InputItem } from './styled'

function DateInput({
	value,
	onChange,
	// openCalendar,
	min,
	max,
	disableClear = false,
}: {
	value: Date | undefined
	onChange: (date: Date | undefined) => void
	// openCalendar: () => void
	min?: Date
	max?: Date

	disableClear?: boolean
}) {
	const [inputValue, setInputValue] = useState('')
	const [error, setError] = useState(false)

	useEffect(() => {
		setInputValue(getInputValueFromDate(value))
	}, [value])

	const updateValue = () => {
		const date = getDateFromInputValue(inputValue)
		if (!date && value) {
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

	const handleClear = () => {
		onChange(undefined)
	}

	return (
		<InputItem $error={error}>
			<CalendarIconWrapper>
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
	)
}

export default DateInput
