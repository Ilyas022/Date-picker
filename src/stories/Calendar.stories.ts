import type { Meta, StoryObj } from '@storybook/react'

import Calendar from '../components/Calendar'

const meta: Meta<typeof Calendar> = {
	component: Calendar,
}

export default meta

type Story = StoryObj<typeof Calendar>

export const Primary: Story = {
	args: {
		text: 'My button',
	},
}
