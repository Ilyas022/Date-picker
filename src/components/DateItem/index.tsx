import React, { useState } from 'react'

import { Day, DayBadge, DayDate } from 'components/CalendarItem/styled'
import PopUp from 'components/PopUp'
import useSingleAndDoubleClick from 'hooks/useSingleAndDoubleClick'
import { isCurrentMonth, isHoliday, isInRange, isToday } from 'utils/getDays'
import TaskStorage from 'utils/TaskStorage'

import { BadgeType, DayProps } from './types'

function DateItem({ currentDate, calendar, max, min, from, to, date, handleClick }: DayProps) {
	const [openPopUp, setOpenPopUp] = useState(false)
	const [taskText, setTaskText] = useState('')
	const [tasks, setTasks] = useState(() => TaskStorage.getTask(currentDate.toISOString()))

	let badge: BadgeType = tasks?.length ?? null
	if (badge && badge > 10) {
		badge = '>10'
	}

	const handleChangeTask = (task: string) => {
		setTaskText(task)
	}

	const handleAddTask = () => {
		if (taskText.trim() !== '') {
			const taskDate = currentDate.toISOString()
			const storedMessages = TaskStorage.getTask(taskDate) || []
			if (!storedMessages.includes(taskText)) {
				TaskStorage.setTask(taskDate, taskText)
				setTaskText('')
				const updatedTasks = TaskStorage.getTask(currentDate.toISOString()) || []
				setTasks(updatedTasks)
			}
		}
	}

	const handleDeleteTask = (task: string) => {
		TaskStorage.deleteTask(currentDate.toISOString(), task)
		const updatedTasks = TaskStorage.getTask(currentDate.toISOString()) || []
		setTasks(updatedTasks)
	}

	const handleClosePopUp = () => {
		setOpenPopUp(false)
	}

	const day = currentDate.getDate()
	const isTodayHoliday = isHoliday(currentDate)
	const isNowCurrentMonth = isCurrentMonth(currentDate, calendar)
	const isDateInRange = isInRange(currentDate, min, max)
	let isDateInCalendarRange = false

	if (from && to) {
		const biggestNum = from > to ? from : to
		const lowestNum = from > to ? to : from
		isDateInCalendarRange = isInRange(currentDate, lowestNum, biggestNum)
	}

	const isFirstDayOfRange = currentDate.toISOString() === from?.toISOString()
	const isLastDayOfRange = currentDate.toISOString() === to?.toISOString()

	const click = useSingleAndDoubleClick(
		() => {
			if (isDateInRange) {
				handleClick(currentDate)
			}
		},
		() => setOpenPopUp(true)
	)

	return (
		<>
			<Day
				$isCurrentMonth={isNowCurrentMonth}
				$isHoliday={isTodayHoliday}
				$isToday={isToday(date, currentDate)}
				$isDateInCalendarRange={isDateInCalendarRange}
				$notInRange={!isDateInRange}
				$isFirstDayOfRange={isFirstDayOfRange}
				$isLastDayOfRange={isLastDayOfRange}
				onClick={click}
			>
				<DayDate>{day}</DayDate>
				{badge && <DayBadge>{badge}</DayBadge>}
			</Day>
			{openPopUp && (
				<PopUp
					value={taskText}
					onChange={handleChangeTask}
					date={currentDate}
					tasks={tasks}
					onSubmit={handleAddTask}
					onDelete={handleDeleteTask}
					close={handleClosePopUp}
				/>
			)}
		</>
	)
}

export default DateItem
