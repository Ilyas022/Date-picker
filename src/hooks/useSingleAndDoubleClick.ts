import { useState, useEffect } from 'react'

const ClickDebounceDuration = 250

function useSingleAndDoubleClick(actionSimpleClick: () => void, actionDoubleClick: () => void) {
	const [click, setClick] = useState(0)

	useEffect(() => {
		const timer = setTimeout(() => {
			if (click === 1) actionSimpleClick()
			setClick(0)
		}, ClickDebounceDuration)

		if (click === 2) actionDoubleClick()

		return () => clearTimeout(timer)
	}, [click])

	return () => setClick((prev) => prev + 1)
}

export default useSingleAndDoubleClick
