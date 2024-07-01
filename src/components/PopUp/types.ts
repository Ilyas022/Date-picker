export interface PopUpProps {
	date: Date
	tasks: string[] | null
	value: string
	onChange: (task: string) => void
	onSubmit: () => void
	onDelete: (task: string) => void
	close: () => void
}
