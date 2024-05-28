import React, { useEffect, useMemo, useState } from 'react'

import CalendarData from 'components/CelndarData'
import Header from 'components/Header'
import { weekDaysFromMonday, weekDaysFromSunday } from 'constants/calendarConstants'
import { ChangeTypes, FirstDayOfWeekType, RangeTypes } from 'types/calendarTypes'
import {
	generateCalendarDays,
	generateCalendarMonths,
	generateCalendarYears,
	getDateToShow,
	isInRange,
} from 'utils/getDays'

import { Calendar, CalendarContainer, DaysGrid, WeekDay, WeekDays } from './styled'

function CalendarItem(props: {
	date: Date
	firstDayOfWeek: FirstDayOfWeekType
	min?: Date
	max?: Date
	from: Date
	to?: Date
	typeOfRange: 0 | 1
	setDate: (currDate: Date) => void
	setFrom: (currDate: Date) => void
	setTo: (currDate: Date) => void
	setView: (view: 'years' | 'months' | 'days') => void
	showWeekends: boolean
	view: 'years' | 'months' | 'days'
}) {
	const {
		date,
		setFrom,
		setTo,
		max,
		min,
		from,
		to,
		showWeekends,
		view,
		typeOfRange,
		setView,
		firstDayOfWeek,
	} = props
	const [calendar, setCalendar] = useState<Date>(date)
	const [rangeType, setRangeType] = useState<0 | 1>(RangeTypes.from)

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
	}, [calendar, showWeekends, view, firstDayOfWeek, from, to])

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
		if (rangeType === RangeTypes.from) {
			setFrom(currDate)
			setRangeType(RangeTypes.to)
		} else {
			if (currDate < from) {
				setTo(from)
				setFrom(currDate)
			} else {
				setTo(currDate)
			}
			setRangeType(RangeTypes.from)
		}
	}

	const handleYearOrMonthClick = (currDate: Date) => {
		if (isInRange(currDate, min, max)) {
			if (typeOfRange === RangeTypes.from) {
				setFrom(currDate)
			} else {
				setTo(currDate)
			}
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
		from,
		to,
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

export default CalendarItem
