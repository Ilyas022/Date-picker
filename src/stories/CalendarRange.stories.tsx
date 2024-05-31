import { useArgs } from '@storybook/preview-api'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import DateInput from 'components/DateInput'

const meta: Meta<typeof DateInput> = {
	component: DateInput,
	title: 'Date Range',
	render: function Render(args) {
		const [, updateArgs] = useArgs()

		return (
			<>
				<DateInput
					{...args}
					title="From"
					date={args.from && new Date(args.from)}
					from={args.from && new Date(args.from)}
					onChange={(newDate) => updateArgs({ from: newDate, date: newDate })}
				/>
				<DateInput
					{...args}
					title="To"
					date={args.to && new Date(args.to)}
					to={args.to && new Date(args.to)}
					onChange={(newDate) => updateArgs({ to: newDate, date: newDate })}
				/>
			</>
		)
	},

	argTypes: {
		date: {
			table: { disable: true },
		},
		from: {
			control: {
				type: 'date',
			},
		},
		to: {
			control: {
				type: 'date',
			},
		},
		title: {
			table: { disable: true },
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
		disableClear: {
			table: {
				disable: true,
			},
		},
	},
}

export default meta
type Story = StoryObj<typeof DateInput>

export const DateRange: Story = {
	args: {
		from: new Date(),
		to: new Date(),
	},
}
