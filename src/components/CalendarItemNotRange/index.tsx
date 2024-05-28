import React, { useEffect, useMemo, useState } from 'react'

import Header from 'components/Header'
import { weekDaysFromMonday, weekDaysFromSunday } from 'constants/calendarConstants'
import { ChangeTypes, FirstDayOfWeekType } from 'types/calendarTypes'
import {
	generateCalendarDays,
	generateCalendarMonths,
	generateCalendarYears,
	getDateToShow,
	isInRange,
} from 'utils/getDays'

import { Calendar, CalendarContainer, DaysGrid, WeekDay, WeekDays } from './styled'
import CalendarData from '../CalendarDataNotRange'

function CalendarItemNotRange(props: {
	date: Date
	firstDayOfWeek: FirstDayOfWeekType
	min?: Date
	max?: Date
	setDate: (currDate: Date) => void
	setView: (view: 'years' | 'months' | 'days') => void
	showWeekends: boolean
	view: 'years' | 'months' | 'days'
}) {
	const { date, setDate, max, min, showWeekends, view, setView, firstDayOfWeek } = props
	const [calendar, setCalendar] = useState<Date>(date)

	useEffect(() => {
		setCalendar(date)
	}, [date])

	const calendarDays: Date[] | null = useMemo(() => {
		if (view === 'days') {
			return generateCalendarDays(calendar, showWeekends, firstDayOfWeek)
		}
		if (view === 'months') {
			return generateCalendarMonths(date)
		}
		return generateCalendarYears(calendar)
	}, [calendar, showWeekends, view, firstDayOfWeek])

	const dateToShow = getDateToShow(calendar, view)

	const handleChangeMonth = (type: keyof typeof ChangeTypes) => {
		const dayMultiplier = 15
		const number = type === 'dec' ? -1 : 1

		const newDate = new Date(calendar)
		if (view === 'days') {
			newDate.setMonth(calendar.getMonth() + number)
		}
		if (view === 'months') {
			newDate.setFullYear(calendar.getFullYear() + number)
		}
		if (view === 'years') {
			newDate.setFullYear(calendar.getFullYear() + number * dayMultiplier)
		}

		setCalendar(newDate)
	}

	const handleChangeView = () => {
		if (view === 'days') {
			setView('months')
		}
		if (view === 'months') {
			setView('years')
		}
		if (view === 'years') {
			setView('days')
		}
	}

	const handleDataChange = (currDate: Date) => {
		setDate(currDate)
	}

	const handleYearOrMonthClick = (currDate: Date) => {
		if (isInRange(currDate, min, max)) {
			setDate(currDate)
			setView('days')
		}
	}

	const data = useMemo(() => {
		const week = firstDayOfWeek ? weekDaysFromMonday : weekDaysFromSunday
		if (showWeekends) {
			return week
		}
		return weekDaysFromMonday.slice(0, 5)
	}, [showWeekends, firstDayOfWeek])

	const propsForCalendar = {
		calendar,
		data: calendarDays,
		date,
		max,
		min,
		view,
		handleDayClick: handleDataChange,
		handleYearOrMonthClick,
	}

	return (
		<Calendar>
			<CalendarContainer>
				<Header
					handleChangeMonth={handleChangeMonth}
					handleChangeView={handleChangeView}
					dateToShow={dateToShow}
				/>
				{view === 'days' && (
					<WeekDays>
						{data.map((day) => (
							<WeekDay key={day}>{day}</WeekDay>
						))}
					</WeekDays>
				)}
				<DaysGrid
					$showWeekends={showWeekends}
					$colsNumber={view === 'months' ? 2 : view === 'years' ? 3 : showWeekends ? 7 : 5}
				>
					{calendarDays && <CalendarData {...propsForCalendar} />}
				</DaysGrid>
			</CalendarContainer>
		</Calendar>
	)
}

export default CalendarItemNotRange
