import { useState, useEffect } from 'react'

const clickDebounceDuration = 250
const singleClick = 1
const doubleClick = 2

function useSingleAndDoubleClick(actionSimpleClick: () => void, actionDoubleClick: () => void) {
	const [click, setClick] = useState(0)

	useEffect(() => {
		const timer = setTimeout(() => {
			if (click === singleClick) actionSimpleClick()
			setClick(0)
		}, clickDebounceDuration)

		if (click === doubleClick) actionDoubleClick()

		return () => clearTimeout(timer)
	}, [click])

	return () => setClick((prev) => prev + 1)
}

export default useSingleAndDoubleClick
