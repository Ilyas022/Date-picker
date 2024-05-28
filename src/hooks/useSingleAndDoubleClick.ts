import { useState, useEffect } from 'react'

function useSingleAndDoubleClick(actionSimpleClick: () => void, actionDoubleClick: () => void) {
	const [click, setClick] = useState(0)
	const Duration = 250

	useEffect(() => {
		const timer = setTimeout(() => {
			// simple click
			if (click === 1) actionSimpleClick()
			setClick(0)
		}, Duration)

		if (click === 2) actionDoubleClick()

		return () => clearTimeout(timer)
	}, [click])

	return () => setClick((prev) => prev + 1)
}

export default useSingleAndDoubleClick
