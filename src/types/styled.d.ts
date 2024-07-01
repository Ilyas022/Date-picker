import 'styled-components'
import { Theme } from './interfaces'

declare module 'styled-components' {
	export interface DefaultTheme extends Theme {}
}
