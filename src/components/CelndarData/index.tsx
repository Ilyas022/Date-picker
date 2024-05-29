import React from 'react'

import { MonthOrYear } from 'components/CalendarItem/styled'
import DateItem from 'components/DateItem'
import { EntityTypes } from 'types/calendarTypes'
import { isInRange } from 'utils/getDays'

import { CalendarDataProps } from './types'

function CalendarData({
	calendar,
	data,
	date,
	max,
	from,
	to,
	min,
	view,
	handleDayClick,
	handleYearOrMonthClick,
}: CalendarDataProps) {
	return (
		<>
			{view === EntityTypes.days &&
				data.map((currentDate) => {
					return (
						<DateItem
							key={`${currentDate}`}
							currentDate={currentDate}
							calendar={calendar}
							min={min}
							max={max}
							from={from}
							to={to}
							date={date}
							handleClick={handleDayClick}
						/>
					)
				})}
			{view === EntityTypes.months &&
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
			{view === EntityTypes.years &&
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

export default CalendarData
