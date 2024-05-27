import React, { useRef, useState } from 'react'

import CalendarItem from 'components/CalendarItem'
import DateInput from 'components/DateInput'
import useOnClickOutside from 'src/hooks/useOnClickOutside'

import { Container, Label, SubTitle, Title, Toggler } from './styled'

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
	const [calendarView, setCalendarView] = useState<'years' | 'months' | 'days'>('days')

	const ref = useRef<null | HTMLDivElement>(null)
	useOnClickOutside(ref, () => {
		setCalendarOpened(false)
		setCalendarView('days')
	})

	const handleWeekendsChange = () => {
		setShowWeekends((prev) => !prev)
	}

	return (
		<Container ref={ref}>
			<Title>{title}</Title>
			{calendarView === 'days' && (
				<Label>
					<SubTitle>Show weekends</SubTitle>
					<Toggler type="checkbox" checked={showWeekends} onChange={handleWeekendsChange} />
				</Label>
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
