import Link from 'next/link'

interface ISearchResultProps {
	voterRecord: {
		id: string
		countyCode: string
		voterID: string
		nameLast: string | null
		nameSuffix: string | null
		nameFirst: string | null
		nameMiddle: string | null
		requestedPublicRecordsExemption: boolean
		residenceAddress1: string | null
		residenceAddress2: string | null
		residenceCity: string | null
		residenceState: string | null
		residenceZipcode: string | null
		mailingAddress1: string | null
		mailingAddress2: string | null
		mailingAddress3: string | null
		mailingCity: string | null
		mailingState: string | null
		mailingZipcode: string | null
		mailingCountry: string | null
		gender: string
		birthDate: Date | null
		registrationDate: Date | null
		partyAffiliation: string
		precinct: string | null
		precinctGroup: number | null
		precinctSplit: string | null
		precinctSuffix: number | null
		voterStatus: string
		congressionalDistrict: number | null
		houseDistrict: number | null
		senateDistrict: number | null
		countyCommissionDistrict: number | null
		schoolBoardDistrict: number | null
		daytimeAreaCode: number | null
		daytimePhoneNumber: number | null
		daytimePhoneExtension: number | null
		emailAddress: string | null
		raceCode: number | null
	}
}

const SearchResult = ({ voterRecord }: ISearchResultProps): JSX.Element => {
	const formatDate = (date: Date | null) => {
		if (date) {
			const formattedDate = date.toLocaleString('en-US', {
				month: 'short',
				day: 'numeric',
				year: 'numeric'
			})
			return formattedDate
		} else {
			return null
		}
	}

	const content = (
		<div className="mb-2 flex min-h-full min-w-full rounded border border-red-200 bg-gray-50">
			<div className="m-2 grid grid-cols-4 gap-1 text-sm">
				<div className="p-1">
					Name:{' '}
					<Link href={`/property?id=${voterRecord.id}`}>
						<span className="text-red-600">
							{voterRecord.nameFirst} {voterRecord.nameLast}
						</span>
					</Link>
				</div>
				<div className="p-1">
					Registered: {formatDate(voterRecord.registrationDate)}
				</div>
				<div className="p-1">Precinct: {voterRecord.precinct}</div>
				<div className="p-1">Status: {voterRecord.voterStatus}</div>
				<div className="p-1">
					Street Address: {voterRecord.residenceAddress1}{' '}
					{voterRecord.residenceAddress2}
				</div>
				<div className="p-1">Party: {voterRecord.partyAffiliation}</div>
				<div className="p-1">Gender: {voterRecord.gender}</div>
				<div className="p-1">Race: {voterRecord.raceCode}</div>
				<div className="p-1">
					City: {voterRecord.residenceCity}, {voterRecord.residenceState} Zip:{' '}
					{voterRecord.residenceZipcode}
				</div>
				<div className="p-1">
					Phone #: ({voterRecord.daytimeAreaCode})
					{voterRecord.daytimePhoneNumber} {voterRecord.daytimePhoneExtension}
				</div>
				<div className="p-1">
					Birth Date: {formatDate(voterRecord.birthDate)}
				</div>
				<div className="p-1">Donations: NA</div>
			</div>
		</div>
	)

	return content
}

export default SearchResult
