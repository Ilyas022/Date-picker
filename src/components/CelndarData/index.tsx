import React from 'react'

import { Day, MonthOrYear } from 'components/CalendarItem/styled'
import { isCurrentMonth, isHoliday, isInRange, isToday } from 'utils/getDays'

interface BaseType {
	calendar: Date
	date: Date
	data: Date[]
	min: Date | undefined
	max: Date | undefined
}

interface CalendarDataDay extends BaseType {
	view: 'days'

	handleDayClick: (date: Date) => void
}
interface CalendarDataMonth extends BaseType {
	view: 'months'

	handleYearOrMonthClick: (date: Date) => void
}
interface CalendarDataYear extends BaseType {
	view: 'years'

	handleYearOrMonthClick: (date: Date) => void
}

type CalendarData = CalendarDataDay | CalendarDataMonth | CalendarDataYear

function CalendarData({
	calendar,
	data,
	date,
	max,
	min,
	view,
	handleDayClick,
	handleYearOrMonthClick,
}: CalendarData) {
	return (
		<>
			{view === 'days' &&
				data.map((currentDate) => {
					const day = currentDate.getDate()
					const month = currentDate.getMonth()
					const year = currentDate.getFullYear()
					const isTodayHoliday = isHoliday(currentDate)
					const isNowCurrentMonth = isCurrentMonth(currentDate, calendar)
					const isDateInRange = isInRange(currentDate, min, max)

					return (
						<Day
							key={`${day}/${month}/${year}`}
							type="button"
							$isCurrentMonth={isNowCurrentMonth}
							$isHoliday={isTodayHoliday}
							$isToday={isToday(date, currentDate)}
							$notInRange={!isDateInRange}
							onClick={() => {
								if (isDateInRange) {
									handleDayClick(currentDate)
								}
							}}
						>
							{day}
						</Day>
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

export default CalendarData
