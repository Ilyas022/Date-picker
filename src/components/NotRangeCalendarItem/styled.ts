import styled from 'styled-components'

import { getFontWeights, getFonts, getGaps, getIndents } from 'utils/themeGetters'

export const Container = styled.div``

export const Title = styled.h1`
	font-weight: ${(props) => getFontWeights(props, 3)};
	font-size: ${(props) => getFonts(props, 2)};
	margin-bottom: ${(props) => getIndents(props, 8, 2)};
`

export const Label = styled.label`
	display: inline-block;
	margin-bottom: ${(props) => getIndents(props, 0, 1)};
`
export const SubTitle = styled.span``

export const Toggler = styled.input``

export const TogglerContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${(props) => getGaps(props, 0, -3)};
`
