import React from 'react'

import LeftArrowIcon from 'assets/LeftArrowIcon'
import RightArrowIcon from 'assets/RightArrowIcon'
import { ChangeTypes } from 'types/calendarTypes'

import { ArrowIcon, DateItem, HeaderItem } from './styled'
import { HeaderProps } from './types'

function Header({ dateToShow, handleChangeMonth, handleChangeView }: HeaderProps) {
	const handleDecDate = () => {
		handleChangeMonth(ChangeTypes.dec)
	}
	const handleIncDate = () => {
		handleChangeMonth(ChangeTypes.inc)
	}
	return (
		<HeaderItem>
			<ArrowIcon onClick={handleDecDate}>
				<LeftArrowIcon />
			</ArrowIcon>
			<DateItem onClick={handleChangeView}>{dateToShow}</DateItem>
			<ArrowIcon onClick={handleIncDate}>
				<RightArrowIcon />
			</ArrowIcon>
		</HeaderItem>
	)
}

export default Header
