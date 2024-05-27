import React from 'react'

import { Month } from './styled'

export const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

export const getMonths = (
	months:
		| {
				name: string
				date: Date
		  }[]
		| null,
	handler: (month: Date) => void
) => {
	const data = months?.map((month) => {
		return (
			<Month key={month} onClick={() => handler(month.date)}>
				{month}
			</Month>
		)
	})
	return data
}
