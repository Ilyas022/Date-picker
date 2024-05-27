import React, { useEffect, useMemo, useState } from 'react'

import LeftArrowIcon from 'assets/LeftArrowIcon'
import RightArrowIcon from 'assets/RightArrowIcon'
import CalendarData from 'components/CelndarData'
import {
	generateCalendarDays,
	generateCalendarMonths,
	generateCalendarYears,
	isInRange,
} from 'utils/getDays'

import { weekDays } from './config'
import {
	ArrowIcon,
	Calendar,
	CalendarContainer,
	DaysGrid,
	Header,
	DateItem,
	WeekDay,
	WeekDays,
} from './styled'
import { ChangeTypes, DaysArray } from './types'

function CalendarItem(props: {
	date: Date
	min?: Date
	max?: Date
	setDate: (currDate: Date) => void
	setView: (view: 'years' | 'months' | 'days') => void
	showWeekends: boolean
	view: 'years' | 'months' | 'days'
}) {
	const { date, setDate, max, min, showWeekends, view, setView } = props
	const [calendar, setCalendar] = useState<Date>(date)

	useEffect(() => {
		setCalendar(date)
	}, [date])

	const days: DaysArray | undefined = useMemo(() => {
		if (view === 'days') {
			return generateCalendarDays(calendar, showWeekends)
		}

		return undefined
	}, [calendar, showWeekends, view])

	const months = useMemo(() => {
		if (view === 'months') {
			return generateCalendarMonths(date)
		}
		return null
	}, [calendar, view])

	const years = useMemo(() => {
		if (view === 'years') {
			return generateCalendarYears(calendar)
		}
		return null
	}, [calendar, view])

	const getDateToShow = () => {
		if (view === 'years') {
			return 'Years'
		}
		if (view === 'months') {
			return calendar.getFullYear()
		}
		if (view === 'days') {
			const currentMonth = calendar.toLocaleDateString('en', { month: 'long' })
			const currentYear = calendar.getFullYear()
			return `${currentMonth} ${currentYear}`
		}

		return undefined
	}

	const dateToShow = getDateToShow()

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
					<DateItem onClick={handleChangeView}>{dateToShow}</DateItem>
					<ArrowIcon onClick={() => handleChangeMonth(ChangeTypes.inc)}>
						<RightArrowIcon />
					</ArrowIcon>
				</Header>
				{view === 'days' && (
					<WeekDays>
						{data.map((day) => (
							<WeekDay key={day}>{day}</WeekDay>
						))}
					</WeekDays>
				)}
				<DaysGrid $showWeekends={showWeekends} $threeCols={view !== 'days'}>
					{days && view === 'days' && (
						<CalendarData
							calendar={calendar}
							data={days}
							date={date}
							max={max}
							min={min}
							view={view}
							handleDayClick={(currDate) => handleDataChange(currDate)}
						/>
					)}
					{months && view === 'months' && (
						<CalendarData
							calendar={calendar}
							data={months}
							date={date}
							max={max}
							min={min}
							view={view}
							handleYearOrMonthClick={(currDate) => handleYearOrMonthClick(currDate)}
						/>
					)}
					{years && view === 'years' && (
						<CalendarData
							calendar={calendar}
							data={years}
							date={date}
							max={max}
							min={min}
							view={view}
							handleYearOrMonthClick={(currDate) => handleYearOrMonthClick(currDate)}
						/>
					)}
				</DaysGrid>
			</CalendarContainer>
		</Calendar>
	)
}

export default CalendarItem
