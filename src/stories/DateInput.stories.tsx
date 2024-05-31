import { useArgs } from '@storybook/preview-api'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import DateInput from 'components/DateInput'

const meta: Meta<typeof DateInput> = {
	component: DateInput,
	title: 'Calendar Input',
	render: function Render(args) {
		const [, updateArgs] = useArgs()

		return (
			<DateInput
				{...args}
				date={args.date && new Date(args.date)}
				onChange={(newDate) => updateArgs({ date: newDate })}
			/>
		)
	},

	argTypes: {
		date: {
			control: {
				type: 'date',
			},
		},
		title: {
			name: 'Title',
			control: { type: 'text' },
		},
		onChange: {
			table: {
				disable: true,
			},
		},
		min: {
			table: {
				disable: true,
			},
		},
		max: {
			table: {
				disable: true,
			},
		},
		from: {
			table: {
				disable: true,
			},
		},
		to: {
			table: {
				disable: true,
			},
		},
		disableClear: {
			table: {
				disable: true,
			},
		},
	},
}

export default meta
type Story = StoryObj<typeof DateInput>

export const CalendarInput: Story = {
	args: {
		date: new Date(),
		title: 'Date',
	},
}
