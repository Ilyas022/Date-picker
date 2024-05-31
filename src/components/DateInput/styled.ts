import styled, { css } from 'styled-components'

import { default as Calendar } from 'assets/CalendarIcon'
import { default as Cross } from 'assets/CrossIcon'
import { getBorders, getBordersRadii, getColors, getIndents, getSizes } from 'utils/themeGetters'

export const Container = styled.div`
	position: relative;
`

export const Title = styled.p`
	margin-bottom: ${(props) => getIndents(props, 1, 2)};
`

export const InputItem = styled.div<{ $error: boolean }>`
	display: flex;
	align-items: center;
	justify-content: space-between;
	border: ${(props) => getBorders(props, 0)} solid ${(props) => getColors(props).border};
	border-radius: ${(props) => getBordersRadii(props, 4)};
	padding: ${(props) => getIndents(props, 1)} ${(props) => getIndents(props, 2, -1)};
	width: ${(props) => getSizes(props, 8, -5)};
	height: ${(props) => getSizes(props, 2, -6)};
	${({ $error }) =>
		$error &&
		css`
			border-color: ${(props) => getColors(props).holiday};
		`}
`

export const Input = styled.input`
	border: 0;
	outline: none;
	padding: ${(props) => getIndents(props, 1, 2)};
`

export const iconStyles = css`
	width: ${(props) => getSizes(props, 0, -8)};
	height: ${(props) => getSizes(props, 0, -8)};
`

export const CalendarIconWrapper = styled.div``

export const CalendarIcon = styled(Calendar)``
export const CrossIcon = styled(Cross)``
export const Button = styled.button``
