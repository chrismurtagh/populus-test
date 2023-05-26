import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
	Suggestion,
	GeocodeResult
} from 'use-places-autocomplete'
import {
	Combobox,
	ComboboxInput,
	ComboboxPopover,
	ComboboxList,
	ComboboxOption
} from '@reach/combobox'
import { ChangeEvent } from 'react'

interface ISearchbarProps {
	onSelectAddress: (
		address: string,
		lat: number | null,
		lng: number | null
	) => void
}

const SearchBar = ({ onSelectAddress }: ISearchbarProps): JSX.Element => {
	const {
		ready,
		value,
		setValue,
		suggestions: { status, data },
		clearSuggestions
	} = usePlacesAutocomplete({ debounce: 300 })

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
		if (e.target.value === '') {
			onSelectAddress('', null, null)
		}
	}

	const handleSelect = async (val: string) => {
		setValue(val, false)
		clearSuggestions()

		const results = await getGeocode({ address: val })

		if (!results || results.length === 0) {
			return
		}

		const { lat, lng } = await getLatLng(results[0] as GeocodeResult)
		onSelectAddress(val, lat, lng)
	}

	const content = (
		<Combobox onSelect={handleSelect}>
			<ComboboxInput
				value={value}
				onChange={handleChange}
				disabled={!ready}
				placeholder="Search an Address"
				className="combobox-input z-50 w-80"
				autoComplete="off"
			/>
			<ComboboxPopover>
				<ComboboxList className="bg-white">
					{status === 'OK' &&
						data.map((suggestion: Suggestion) => (
							<ComboboxOption
								className="border-b"
								key={suggestion.place_id}
								value={suggestion.description}
							/>
						))}
				</ComboboxList>
			</ComboboxPopover>
		</Combobox>
	)
	return content
}

export default SearchBar
