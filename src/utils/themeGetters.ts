import { ExecutionContext } from 'styled-components'

export const getColors = ({ theme }: ExecutionContext) => theme.colors

export const getSizes = ({ theme }: ExecutionContext, idx: number, inc = 0) =>
	`${theme.sizes[idx] + inc}px`

export const getGaps = ({ theme }: ExecutionContext, idx: number, inc = 0) =>
	`${theme.gaps[idx] + inc}px`

export const getIndents = ({ theme }: ExecutionContext, idx: number, inc = 0) =>
	`${theme.indents[idx] + inc}px`

export const getFonts = (props: ExecutionContext, idx: number, inc = 0) =>
	`${props.theme.fonts[idx] + inc}px`

export const getFontWeights = ({ theme }: ExecutionContext, idx: number, inc = 0) =>
	`${theme.fontWeights[idx] + inc}`

export const getlineHeights = ({ theme }: ExecutionContext, idx: number, inc = 0) =>
	`${theme.lineHeights[idx] + inc}%`

export const getBorders = ({ theme }: ExecutionContext, idx: number, inc = 0) =>
	`${theme.borders[idx] + inc}px`

export const getBordersRadii = ({ theme }: ExecutionContext, idx: number, inc = 0) =>
	`${theme.bordersRadii[idx] + inc}px`
