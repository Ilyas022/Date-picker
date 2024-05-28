import styled from 'styled-components'

import {
	getBordersRadii,
	getColors,
	getFonts,
	getGaps,
	getIndents,
	getSizes,
} from 'utils/themeGetters'

export const PopUpItem = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	z-index: 5;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	background-color: ${(props) => getColors(props).popUpBg};
`

export const Container = styled.div`
	position: relative;
	padding: 20px;
	background-color: ${(props) => getColors(props).white};
	width: 50%;
	height: 70vh;
	display: flex;
	flex-direction: column;
	gap: ${(props) => getGaps(props, 2)};
`

export const Title = styled.p`
	text-align: center;
	margin-bottom: ${(props) => getIndents(props, 3)};
`

export const DeleteBtn = styled.button`
	position: relative;
	width: ${(props) => getSizes(props, 0)};
	height: ${(props) => getSizes(props, 0)};
	opacity: 0.5;
	transition: opacity 0.3s ease 0s;

	&:hover {
		opacity: 1;
	}

	&:before,
	&:after {
		content: '';
		position: absolute;
		top: 0;
		left: 50%;
		height: 100%;
		width: ${(props) => getSizes(props, 0, -22)};
		background-color: ${(props) => getColors(props).primary};
	}
	&:before {
		transform: rotate(45deg);
	}
	&:after {
		transform: rotate(-45deg);
	}
`

export const CloseBtn = styled(DeleteBtn)`
	position: absolute;
	right: ${(props) => getIndents(props, 3)};
	top: ${(props) => getIndents(props, 3, 2)};
`

export const TasksContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${(props) => getGaps(props, 0, 2)};
	max-height: 63%;
	overflow: auto;
	padding: ${(props) => getIndents(props, 3)};
	margin: ${(props) => getIndents(props, 0, -24)};

	&::-webkit-scrollbar {
		width: ${(props) => getSizes(props, 0, -20)};
	}

	&::-webkit-scrollbar-thumb {
		background: ${(props) => getColors(props).inActive};
	}
`

export const TaskItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: ${(props) => getGaps(props, 2)};
	padding: ${(props) => getIndents(props, 1, 2)};
	box-shadow: ${(props) => getColors(props).shadow};
`

export const TaskText = styled.p``

export const Controls = styled.div`
	position: relative;
	z-index: 5;
	display: flex;
	flex-direction: column;
	gap: ${(props) => getGaps(props, 0, 2)};
`

export const MessageField = styled.textarea`
	margin-top: ${(props) => getIndents(props, 3)};
	padding: ${(props) => getIndents(props, 3)};
	font-size: ${(props) => getFonts(props, 1)};
	resize: none;
`

export const AddTaskBtn = styled.button`
	border-radius: ${(props) => getBordersRadii(props, 4)};
	background-color: ${(props) => getColors(props).primary};
	padding: ${(props) => getIndents(props, 3)};
`
