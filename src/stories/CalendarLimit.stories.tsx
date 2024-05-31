import { useArgs } from '@storybook/preview-api'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import DateInput from 'components/DateInput'

const meta: Meta<typeof DateInput> = {
	component: DateInput,
	title: 'Date Limit',
	render: function Render(args) {
		const [, updateArgs] = useArgs()

		return (
			<>
				<DateInput
					{...args}
					min={undefined}
					max={undefined}
					title="Min"
					date={args.min && new Date(args.min)}
					onChange={(newDate) => updateArgs({ min: newDate })}
				/>
				<DateInput
					{...args}
					min={undefined}
					max={undefined}
					title="Max"
					date={args.max && new Date(args.max)}
					onChange={(newDate) => updateArgs({ max: newDate })}
				/>
				<DateInput
					{...args}
					title="Date"
					date={args.date && new Date(args.date)}
					min={args.min && new Date(args.min)}
					max={args.max && new Date(args.max)}
					onChange={(newDate) => updateArgs({ to: newDate, date: newDate })}
				/>
			</>
		)
	},

	argTypes: {
		date: {
			control: {
				type: 'date',
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
		title: {
			table: { disable: true },
		},
		onChange: {
			table: {
				disable: true,
			},
		},
		min: {
			control: {
				type: 'date',
			},
		},
		max: {
			control: {
				type: 'date',
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

export const DateLimit: Story = {
	args: {
		date: new Date(),
		min: new Date(),
		max: new Date(),
	},
}
