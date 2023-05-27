import { useRouter } from 'next/router'
import { useState } from 'react'

interface ISearchCriteria {
	field: string
	operator: string
	value: string
}

const AdvancedSearch = (): JSX.Element => {
	const [searchCriteria, setSearchCriteria] = useState<ISearchCriteria[]>([
		{ field: '', operator: '', value: '' }
	])

	const router = useRouter()

	const addSearchCriteria = () => {
		setSearchCriteria([
			...searchCriteria,
			{ field: '', operator: '', value: '' }
		])
	}

	const handleFieldChange = (index: number, field: string) => {
		const updatedCriteria = [...searchCriteria]
		if (updatedCriteria && updatedCriteria[index]) {
			updatedCriteria[index]!.field = field
			setSearchCriteria(updatedCriteria)
		}
	}

	const handleOperatorChange = (index: number, operator: string) => {
		const updatedCriteria = [...searchCriteria]
		if (updatedCriteria && updatedCriteria[index]) {
			updatedCriteria[index]!.operator = operator
			setSearchCriteria(updatedCriteria)
		}
	}

	const handleValueChange = (index: number, value: string) => {
		const updatedCriteria = [...searchCriteria]
		if (updatedCriteria && updatedCriteria[index]) {
			updatedCriteria[index]!.value = value
			setSearchCriteria(updatedCriteria)
		}
	}

	const handleSearch = () => {
		console.log(searchCriteria)
		// Create the search query based on the searchCriteria array
		const query = searchCriteria
			.map(
				criteria => `${criteria.field} ${criteria.operator} ${criteria.value}`
			)
			.join(' AND ')

		router.push(`/results?query=${encodeURIComponent(query)}`)
		// Perform the search operation with the searchQuery
		console.log('Search Query:', query)
		// TODO: Perform the actual search operation using the query

		// Clear the search criteria after performing the search
		//setSearchCriteria([{ field: '', operator: '', value: '' }])
	}

	const content = (
		<div className="rounded border bg-gray-100 p-4">
			{searchCriteria.map((criteria, index) => (
				<div className="p-2" key={index}>
					<select
						className="mx-2 px-2"
						value={criteria.field}
						onChange={e => handleFieldChange(index, e.target.value)}
					>
						<option value="">Select a field</option>
						{/* Add database fields as options */}
						<option value="Voter Name">Voter Name</option>
						<option value="Address">Address</option>
						<option value="City">City</option>
						<option value="State">State</option>
						<option value="Zip Code">Zip Code</option>
						<option value="Precinct">Precinct</option>
						<option value="Age">Age</option>
						<option value="Voter Status">Voter Status</option>
						<option value="Homeowner">Homeowner</option>
						<option value="Donations">Donations</option>
					</select>
					<select
						value={criteria.operator}
						onChange={e => handleOperatorChange(index, e.target.value)}
					>
						<option value="">Select an operator</option>
						<option value="contains">Contains</option>
						<option value="notContain">Does not Contain</option>
						<option value="equal">Equal to</option>
						<option value="greaterThen">Greater then</option>
						<option value="lessThen">Less then</option>
					</select>
					<input
						className="mx-2 rounded border"
						type="text"
						value={criteria.value}
						onChange={e => handleValueChange(index, e.target.value)}
						placeholder="Enter a value"
					/>
				</div>
			))}
			<div className="flex justify-between p-4">
				<button className="border" onClick={addSearchCriteria}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="h-6 w-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 4.5v15m7.5-7.5h-15"
						/>
					</svg>
				</button>
				<button className="text-red-600" onClick={handleSearch}>
					Search
				</button>
			</div>
		</div>
	)

	return content
}

export default AdvancedSearch
