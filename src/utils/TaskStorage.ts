interface TaskStorageInterface {
	getTask(date: string): string[] | null
	setTask(date: string, message: string): void
	deleteTask(date: string, message: string): void
}

class TaskStorage implements TaskStorageInterface {
	private storageKey: string

	constructor(storageKey: string) {
		this.storageKey = storageKey
	}

	getTask(date: string): string[] | null {
		const storedData = localStorage.getItem(this.storageKey)
		if (storedData) {
			const data = JSON.parse(storedData)
			return data[date] || null
		}
		return null
	}

	setTask(date: string, message: string): void {
		let storedData: { [date: string]: string[] } = {}
		const existingData = localStorage.getItem(this.storageKey)
		if (existingData) {
			storedData = JSON.parse(existingData)
		}
		if (!storedData[date]) {
			storedData[date] = []
		}
		storedData[date].push(message)
		localStorage.setItem(this.storageKey, JSON.stringify(storedData))
	}

	deleteTask(date: string, message: string): void {
		const storedData = localStorage.getItem(this.storageKey)
		if (storedData) {
			const data = JSON.parse(storedData)
			if (data[date]) {
				const index = data[date].indexOf(message)
				if (index !== -1) {
					data[date].splice(index, 1)
					localStorage.setItem(this.storageKey, JSON.stringify(data))
				}
			}
		}
	}
}

class MessageDecorator implements TaskStorageInterface {
	private storage: TaskStorageInterface

	constructor(storage: TaskStorageInterface) {
		this.storage = storage
	}

	getTask(date: string): string[] | null {
		return this.storage.getTask(date)
	}

	setTask(date: string, message: string): void {
		// eslint-disable-next-line
		console.log(`[MessageStorage] Set Message: Date "${date}", Message "${message}"`)
		this.storage.setTask(date, message)
	}

	deleteTask(date: string, message: string): void {
		// eslint-disable-next-line
		console.log(`[MessageStorage] Delete Message: Date "${date}", Message "${message}"`)
		this.storage.deleteTask(date, message)
	}
}

const storageKey = 'tasks'
const messageStorage: TaskStorageInterface = new TaskStorage(storageKey)
export default new MessageDecorator(messageStorage)
