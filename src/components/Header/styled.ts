import styled from 'styled-components'

import { getColors, getIndents, getSizes } from 'utils/themeGetters'

export const HeaderItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	margin-bottom: ${(props) => getIndents(props, 1, 2)};
	padding: ${(props) => getIndents(props, 1, 2)} 0;
`

export const ArrowIcon = styled.button`
	padding: 0;
	width: ${(props) => getSizes(props, 0, -8)};
	height: ${(props) => getSizes(props, 0, -8)};
	transition: color 0.3s;

	&:hover {
		cursor: pointer;
		color: ${(props) => getColors(props).holiday};
	}

	& > svg {
		height: 100%;
		width: 100%;
	}
`

export const DateItem = styled.button`
	&:hover {
		cursor: pointer;
	}
`
