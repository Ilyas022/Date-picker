import React from 'react'

import { CalendarItem } from './styled'

function Calendar({ text }: { text: string }) {
	return <CalendarItem>{text}</CalendarItem>
}

export default Calendar
