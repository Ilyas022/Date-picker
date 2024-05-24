import React, { useEffect, useState } from 'react'

import { getDateFromInputValue, getInputValueFromDate } from 'utils/getDays'

import { CalendarIcon, CrossIcon, Input, InputItem } from './styled'

function DateInput({ value, onChange }: { value: Date; onChange: (date: Date) => void }) {
	const [inputValue, setInputValue] = useState('')

	useEffect(() => {
		setInputValue(getInputValueFromDate(value))
	}, [value])

	const updateValue = () => {
		const date = getDateFromInputValue(inputValue)
		if (!date) {
			setInputValue(getInputValueFromDate(value))
			return
		}

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
		<InputItem>
			<CalendarIcon />
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
