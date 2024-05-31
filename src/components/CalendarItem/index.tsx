import React, { useEffect, useMemo, useState } from 'react'

import CalendarData from 'components/CelndarData'
import Header from 'components/Header'
import Togglers from 'components/Togglers'
import { weekDaysFromMonday, weekDaysFromSunday } from 'constants/calendarConstants'
import { ChangeTypes, EntityTypes, FirstDayOfWeekType, ViewTypes } from 'types/calendarTypes'
import {
	generateCalendarDays,
	generateCalendarMonths,
	generateCalendarYears,
	getDateToShow,
	isInRange,
} from 'utils/getDays'

import { Calendar, CalendarContainer, ClearBtn, DaysGrid, WeekDay, WeekDays } from './styled'

function CalendarItem(props: {
	date?: Date
	min?: Date
	max?: Date
	from?: Date
	to?: Date
	setDate: (currDate?: Date) => void
}) {
	const today = new Date()
	const defaultDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())

	const { date = defaultDate, setDate, max, min, from, to } = props
	const [calendar, setCalendar] = useState(date)
	const [view, setView] = useState<ViewTypes>('days')
	const [showWeekends, setShowWeekends] = useState(true)
	const [firstDayOfWeek, setFirstDayOfWeek] = useState<FirstDayOfWeekType>(6)

	useEffect(() => {
		if (calendar > date || calendar < date) {
			setCalendar(date)
		}
	}, [date])

	const calendarDays: Date[] | null = useMemo(() => {
		if (view === EntityTypes.days) {
			return generateCalendarDays(calendar, showWeekends, firstDayOfWeek)
		}
		if (view === EntityTypes.months) {
			return generateCalendarMonths(date)
		}
		return generateCalendarYears(calendar)
	}, [calendar, showWeekends, view, firstDayOfWeek, from, to])

	const dateToShow = getDateToShow(calendar, view)

	const handleChangeMonth = (type: keyof typeof ChangeTypes) => {
		const dayMultiplier = 15
		const number = type === 'dec' ? -1 : 1

		const newDate = new Date(calendar)
		if (view === EntityTypes.days) {
			newDate.setMonth(calendar.getMonth() + number)
		}
		if (view === EntityTypes.months) {
			newDate.setFullYear(calendar.getFullYear() + number)
		}
		if (view === EntityTypes.years) {
			newDate.setFullYear(calendar.getFullYear() + number * dayMultiplier)
		}

		setCalendar(newDate)
	}

	const handleChangeView = () => {
		if (view === EntityTypes.days) {
			setView(EntityTypes.months)
		}
		if (view === EntityTypes.months) {
			setView(EntityTypes.years)
		}
		if (view === EntityTypes.years) {
			setView(EntityTypes.days)
		}
	}

	const handleDataChange = (currDate: Date) => {
		setDate(currDate)
	}

	const handleYearOrMonthClick = (currDate: Date) => {
		if (isInRange(currDate, min, max)) {
			setDate(currDate)
			setView(EntityTypes.days)
		}
	}

	const handleWeekendsChange = () => {
		setShowWeekends((prev) => !prev)
	}

	const handleFirstDayOfWeekChange = () => {
		if (firstDayOfWeek === 6) {
			return setFirstDayOfWeek(0)
		}
		return setFirstDayOfWeek(6)
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
			<Togglers
				firstDayOfWeek={firstDayOfWeek}
				showWeekends={showWeekends}
				handleWeekendsChange={handleWeekendsChange}
				handleFirstDayOfWeekChange={handleFirstDayOfWeekChange}
			/>
			<CalendarContainer>
				<Header
					handleChangeMonth={handleChangeMonth}
					handleChangeView={handleChangeView}
					dateToShow={dateToShow}
				/>
				{view === EntityTypes.days && (
					<WeekDays>
						{data.map((day) => (
							<WeekDay key={day}>{day}</WeekDay>
						))}
					</WeekDays>
				)}
				<DaysGrid
					$showWeekends={showWeekends}
					$colsNumber={
						view === EntityTypes.months ? 2 : view === EntityTypes.years ? 3 : showWeekends ? 7 : 5
					}
				>
					{calendarDays && <CalendarData {...propsForCalendar} />}
				</DaysGrid>
				{from && to && (
					<ClearBtn type="button" onClick={() => setDate(undefined)}>
						Clear
					</ClearBtn>
				)}
			</CalendarContainer>
		</Calendar>
	)
}

export default CalendarItem
