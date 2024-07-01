import styled from 'styled-components'

import { getGaps } from 'utils/themeGetters'

export const Label = styled.label`
	display: inline-block;
	margin-bottom: 5px;
`
export const SubTitle = styled.span``

export const Toggler = styled.input``

export const TogglerContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: ${(props) => getGaps(props, 0, -3)};
`
