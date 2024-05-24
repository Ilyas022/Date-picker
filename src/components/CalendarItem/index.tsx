import React, { useEffect, useMemo, useState } from 'react'

import LeftArrowIcon from 'assets/LeftArrowIcon'
import RightArrowIcon from 'assets/RightArrowIcon'
import { generateCalendar, isInRange, isToday } from 'utils/getDays'

import { weekDays } from './config'
import {
	ArrowIcon,
	Calendar,
	CalendarContainer,
	Day,
	DaysGrid,
	Header,
	Month,
	WeekDay,
	WeekDays,
} from './styled'
import { ChangeTypes, DaysArray } from './types'

function CalendarItem(props: {
	date: Date
	min?: Date
	max?: Date
	setDate: (currDate: Date) => void
	showWeekends: boolean
}) {
	const { date, setDate, max, min, showWeekends } = props
	const [calendar, setCalendar] = useState<Date>(date)

	useEffect(() => {
		setCalendar(date)
	}, [date])

	const days: DaysArray = useMemo(() => {
		return generateCalendar(calendar, showWeekends)
	}, [calendar, showWeekends])

	const currentMonth = calendar.toLocaleDateString('en', { month: 'long' })
	const currentYear = calendar.getFullYear()

	const handleChangeMonth = (type: keyof typeof ChangeTypes) => {
		const number = type === 'dec' ? -1 : 1
		const newDate = new Date(calendar)
		newDate.setMonth(calendar.getMonth() + number)
		setCalendar(newDate)
	}

	const handleDataChange = (day: number, month: number, year: number) => {
		setDate(new Date(year, month, day))
	}

	const data = useMemo(() => {
		if (showWeekends) {
			return weekDays
		}
		return weekDays.slice(0, 5)
	}, [showWeekends])

	return (
		<Calendar>
			<CalendarContainer>
				<Header>
					<ArrowIcon onClick={() => handleChangeMonth(ChangeTypes.dec)}>
						<LeftArrowIcon />
					</ArrowIcon>
					<Month>{`${currentMonth} ${currentYear}`}</Month>
					<ArrowIcon onClick={() => handleChangeMonth(ChangeTypes.inc)}>
						<RightArrowIcon />
					</ArrowIcon>
				</Header>
				<WeekDays>
					{data.map((day) => (
						<WeekDay key={day}>{day}</WeekDay>
					))}
				</WeekDays>
				<DaysGrid $showWeekends={showWeekends}>
					{days.map(({ day, month, year, isCurrentMonth, isHoliday }) => {
						const isDateInRange = isInRange(new Date(year, month, day), min, max)

						return (
							<Day
								key={`${day}/${month}/${year}`}
								type="button"
								$isCurrentMonth={isCurrentMonth}
								$isHoliday={isHoliday}
								$isToday={isToday(date, new Date(year, month, day))}
								$notInRange={!isDateInRange}
								onClick={() => {
									if (isDateInRange) {
										handleDataChange(day, month, year)
									}
								}}
							>
								{day}
							</Day>
						)
					})}
				</DaysGrid>
			</CalendarContainer>
		</Calendar>
	)
}

export default CalendarItem
