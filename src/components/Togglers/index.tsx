import React from 'react'

import { Label, SubTitle, Toggler, TogglerContainer } from './styled'
import { TogglersProps } from './types'

function Togglers({
	firstDayOfWeek,
	handleFirstDayOfWeekChange,
	handleWeekendsChange,
	showWeekends,
}: TogglersProps) {
	return (
		<TogglerContainer>
			<Label>
				<SubTitle>Show weekends</SubTitle>
				<Toggler type="checkbox" checked={showWeekends} onChange={handleWeekendsChange} />
			</Label>
			<Label>
				<SubTitle>First day of week: {firstDayOfWeek === 6 ? 'Monday' : 'Sunday'}</SubTitle>
				<Toggler
					type="checkbox"
					checked={firstDayOfWeek === 6}
					onChange={handleFirstDayOfWeekChange}
				/>
			</Label>
		</TogglerContainer>
	)
}

export default Togglers
