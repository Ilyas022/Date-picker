import styled from 'styled-components'

import { getFontWeights, getFonts, getIndents } from 'utils/themeGetters'

export const Container = styled.div``

export const Title = styled.h1`
	font-weight: ${(props) => getFontWeights(props, 3)};
	font-size: ${(props) => getFonts(props, 2)};
	margin-bottom: ${(props) => getIndents(props, 1, 2)};
`
