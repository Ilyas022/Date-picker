import React, { useRef, useState } from 'react'

import CalendarItem from 'components/CalendarItem'
import DateInput from 'components/DateInput'
import useOnClickOutside from 'src/hooks/useOnClickOutside'

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

	const ref = useRef<null | HTMLDivElement>(null)
	useOnClickOutside(ref, () => {
		setCalendarOpened(false)
	})

	return (
		<div ref={ref}>
			<h1>{title}</h1>
			<DateInput
				value={date}
				onChange={setDate}
				openCalendar={() => setCalendarOpened(true)}
				min={min}
				max={max}
			/>
			{isCalendarOpened && <CalendarItem date={date} setDate={setDate} min={min} max={max} />}
		</div>
	)
}

export default Item
