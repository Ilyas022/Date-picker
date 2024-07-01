import React, { ChangeEvent, useRef } from 'react'

import useOnClickOutside from 'hooks/useOnClickOutside'

import {
	AddTaskBtn,
	CloseBtn,
	Container,
	Controls,
	DeleteBtn,
	MessageField,
	PopUpItem,
	TaskItem,
	TaskText,
	TasksContainer,
	Title,
} from './styled'
import { PopUpProps } from './types'

function PopUp({ close, date, onDelete, onSubmit, onChange, tasks, value }: PopUpProps) {
	const ref = useRef(null)
	useOnClickOutside(ref, () => {
		close()
	})
	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const task = e.target.value
		onChange(task)
	}
	const handleClick = () => {
		onSubmit()
	}
	const handleDelete = (task: string) => {
		onDelete(task)
	}

	return (
		<PopUpItem>
			<Container ref={ref}>
				<Title>{date.toLocaleDateString('en', { dateStyle: 'full' })}</Title>
				<CloseBtn onClick={close} />
				<TasksContainer>
					{tasks?.map((taskItem) => (
						<TaskItem key={taskItem}>
							<TaskText>{taskItem}</TaskText> <DeleteBtn onClick={() => handleDelete(taskItem)} />
						</TaskItem>
					))}
				</TasksContainer>
				<Controls>
					<MessageField placeholder="Add your task" value={value} onChange={handleChange} />
					<AddTaskBtn type="button" onClick={handleClick}>
						Add task
					</AddTaskBtn>
				</Controls>
			</Container>
		</PopUpItem>
	)
}

export default PopUp
