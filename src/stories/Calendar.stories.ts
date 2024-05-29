import type { Meta, StoryObj } from '@storybook/react'

import Calendar from '../components/CalendarContainer'

const meta: Meta<typeof Calendar> = {
	component: Calendar,
}

export default meta

type Story = StoryObj<typeof Calendar>

export const CalendarDemo: Story = {}
