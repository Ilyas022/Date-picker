import React, { useRef, useState } from 'react'

import CalendarItem from 'components/CalendarItem'
import DateInput from 'components/DateInput'
import Togglers from 'components/Togglers'
import useOnClickOutside from 'src/hooks/useOnClickOutside'
import { FirstDayOfWeekType, RangeTypes } from 'types/calendarTypes'

import { Container, Title } from './styled'
import { RangeCalendarItemProps } from './types'

function RangeCalendarItem(props: RangeCalendarItemProps) {
	const { title, setFrom, setTo, min, max, from, to, typeOfRange } = props

	const [isCalendarOpened, setCalendarOpened] = useState(false)
	const [showWeekends, setShowWeekends] = useState(true)
	const [firstDayOfWeek, setFirstDayOfWeek] = useState<FirstDayOfWeekType>(6)
	const [calendarView, setCalendarView] = useState<'years' | 'months' | 'days'>('days')

	const isFrom = typeOfRange === RangeTypes.from

	const date = isFrom ? from : to
	const setDate = isFrom ? setFrom : setTo

	const ref = useRef<null | HTMLDivElement>(null)
	useOnClickOutside(ref, () => {
		setCalendarOpened(false)
		setCalendarView('days')
	})

	const handleWeekendsChange = () => {
		setShowWeekends((prev) => !prev)
	}
	const handleFirstDayOfWeekChange = () => {
		if (firstDayOfWeek === 6) {
			return setFirstDayOfWeek(0)
		}
		return setFirstDayOfWeek(6)
	}

	return (
		<Container ref={ref}>
			<Title>{title}</Title>
			{calendarView === 'days' && (
				<Togglers
					firstDayOfWeek={firstDayOfWeek}
					showWeekends={showWeekends}
					handleWeekendsChange={handleWeekendsChange}
					handleFirstDayOfWeekChange={handleFirstDayOfWeekChange}
				/>
			)}

			<DateInput
				value={date}
				onChange={setDate}
				openCalendar={() => setCalendarOpened(true)}
				min={min}
				max={max}
			/>
			{isCalendarOpened && (
				<CalendarItem
					firstDayOfWeek={firstDayOfWeek}
					date={date}
					typeOfRange={typeOfRange}
					setDate={setDate}
					setFrom={setFrom}
					setTo={setTo}
					min={min}
					max={max}
					from={from}
					to={to}
					showWeekends={showWeekends}
					view={calendarView}
					setView={setCalendarView}
				/>
			)}
		</Container>
	)
}

export default RangeCalendarItem
