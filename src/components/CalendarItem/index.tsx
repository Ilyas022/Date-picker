import React, { useEffect, useMemo, useState } from 'react'

import CalendarData from 'components/CelndarData'
import Header from 'components/Header'
import { weekDaysFromMonday, weekDaysFromSunday } from 'constants/calendarConstants'
import { ChangeTypes, EntityTypes, FirstDayOfWeekType, RangeTypes } from 'types/calendarTypes'
import {
	generateCalendarDays,
	generateCalendarMonths,
	generateCalendarYears,
	getDateToShow,
	isInRange,
} from 'utils/getDays'

import { Calendar, CalendarContainer, ClearBtn, DaysGrid, WeekDay, WeekDays } from './styled'

function CalendarItem(props: {
	date: Date
	firstDayOfWeek: FirstDayOfWeekType
	min?: Date
	max?: Date
	from: Date
	to?: Date
	setFrom: (currDate: Date) => void
	setTo: (currDate: Date | undefined) => void
	setView: (view: 'years' | 'months' | 'days') => void
	showWeekends: boolean
	view: 'years' | 'months' | 'days'
}) {
	const { date, setFrom, setTo, max, min, from, to, showWeekends, view, setView, firstDayOfWeek } =
		props
	const [calendar, setCalendar] = useState<Date>(date)
	const [rangeType, setRangeType] = useState<0 | 1>(RangeTypes.from)

	useEffect(() => {
		setCalendar(date)
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
		if (rangeType === RangeTypes.from) {
			if (to && currDate > to) {
				return setTo(currDate)
			}
			setFrom(currDate)
			setRangeType(RangeTypes.to)
		} else if (currDate < from) {
			setFrom(currDate)
		} else {
			setTo(currDate)
			setRangeType(RangeTypes.from)
		}
	}

	const handleYearOrMonthClick = (currDate: Date) => {
		if (isInRange(currDate, min, max)) {
			if (rangeType === RangeTypes.from) {
				if (to && currDate > to) {
					setTo(currDate)
					setFrom(to)
				} else {
					setFrom(currDate)
					setRangeType(RangeTypes.to)
				}
			} else {
				setTo(currDate)
				setRangeType(RangeTypes.from)
			}
			setView(EntityTypes.days)
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
					<ClearBtn type="button" onClick={() => setTo(undefined)}>
						Clear
					</ClearBtn>
				)}
			</CalendarContainer>
		</Calendar>
	)
}

export default CalendarItem
