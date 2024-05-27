import React, { useRef, useState } from 'react'

import CalendarItem from 'components/CalendarItem'
import DateInput from 'components/DateInput'
import useOnClickOutside from 'src/hooks/useOnClickOutside'
import { FirstDayOfWeekType } from 'types/interfaces'

import { Container, Label, SubTitle, Title, Toggler, TogglerContainer } from './styled'

function Item({
	title,
	date,
	setDate,
	min,
	max,
}: {
	title: string
	date: Date
	min?: Date
	max?: Date
	setDate: (currDate: Date) => void
}) {
	const [isCalendarOpened, setCalendarOpened] = useState(false)
	const [showWeekends, setShowWeekends] = useState(true)
	const [firstDayOfWeek, setFirstDayOfWeek] = useState<FirstDayOfWeekType>(6)
	const [calendarView, setCalendarView] = useState<'years' | 'months' | 'days'>('days')

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
				<TogglerContainer>
					<Label>
						<SubTitle>Show weekends</SubTitle>
						<Toggler type="checkbox" checked={showWeekends} onChange={handleWeekendsChange} />
					</Label>
					<Label>
						<SubTitle>First day of week: {firstDayOfWeek === 6 ? 'Monday' : 'Sunday'}</SubTitle>
						<Toggler
							type="checkbox"
							checked={firstDayOfWeek === 6}
							onChange={handleFirstDayOfWeekChange}
						/>
					</Label>
				</TogglerContainer>
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
					setDate={setDate}
					min={min}
					max={max}
					showWeekends={showWeekends}
					view={calendarView}
					setView={setCalendarView}
				/>
			)}
		</Container>
	)
}

export default Item
