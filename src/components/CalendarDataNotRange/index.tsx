import React from 'react'

import { MonthOrYear } from 'components/CalendarItem/styled'
import { isInRange } from 'utils/getDays'

import { CalendarDataProps } from './types'
import DateItemNotRange from '../DateItemNotRange'

function CalendarDataNotRange(props: CalendarDataProps) {
	const { calendar, data, date, max, min, view, handleDayClick, handleYearOrMonthClick } = props

	return (
		<>
			{view === 'days' &&
				data.map((currentDate) => {
					return (
						<DateItemNotRange
							key={`${currentDate}`}
							currentDate={currentDate}
							calendar={calendar}
							min={min}
							max={max}
							date={date}
							handleClick={handleDayClick}
						/>
					)
				})}
			{view === 'months' &&
				data.map((currentDate) => {
					const isDateInRange = isInRange(currentDate, min, max)
					return (
						<MonthOrYear
							$notInRange={!isDateInRange}
							key={currentDate.getMonth()}
							onClick={() => handleYearOrMonthClick(currentDate)}
						>
							{currentDate.toLocaleString('en', { month: 'long' })}
						</MonthOrYear>
					)
				})}
			{view === 'years' &&
				data.map((currentDate) => {
					const currentYear = currentDate.getFullYear()
					const isDateInRange = isInRange(currentDate, min, max)
					return (
						<MonthOrYear
							$notInRange={!isDateInRange}
							onClick={() => handleYearOrMonthClick(currentDate)}
							key={currentYear}
						>
							{currentYear}
						</MonthOrYear>
					)
				})}
		</>
	)
}

export default CalendarDataNotRange
