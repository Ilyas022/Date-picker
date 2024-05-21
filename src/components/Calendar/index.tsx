import React from 'react'

import Icon from 'assets/icon'

import { CalendarItem } from './styled'

function Calendar({ text }: { text: string }) {
	return (
		<CalendarItem>
			{text}
			<Icon />
		</CalendarItem>
	)
}

export default Calendar
