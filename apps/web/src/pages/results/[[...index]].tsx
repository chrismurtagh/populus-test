import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import SearchResult from '../../components/Search/SearchResult'
import { trpc } from '../../utils/trpc'

const ResultsPage: NextPage = () => {
	const router = useRouter()
	const inputAddress: string = router.query.address as string

	const parseAddress = (address: string) => {
		// Split the address into parts
		const [streetAddress, city, stateZip] = address.split(',')

		if (streetAddress && city && stateZip) {
			// Remove special characters from the address
			const cleanedAddress = streetAddress.replace(/[^\w\s]/gi, '')
			const residenceCity = city.trim()

			// Remove extra spaces from the parts
			const residenceAddress1 = cleanedAddress.trim()
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const [_blank, _state, residenceZipcode = ''] = stateZip.split(' ')
			// Return the extracted fields
			if (residenceZipcode) {
				return { residenceAddress1, residenceCity, residenceZipcode }
			}
		}
	}
	const parsedAddress = parseAddress(inputAddress) || {
		residenceAddress1: '',
		residenceCity: '',
		residenceZipcode: ''
	}

	const {
		data: searchGoogleResult,
		error,
		isLoading
	} = trpc.voterData.getVoterRecordByGoogleAddress.useQuery(parsedAddress)

	if (error) {
		console.error('An error occurred:', error)
	}

	if (isLoading) {
		return <div>Loading...</div>
	}

	const content = (
		<main className="flex flex-col items-center text-gray-700">
			<div className="flex flex-col items-center justify-center">
				<div className="container flex flex-col items-center justify-center p-8 px-4">
					<h1 className="mb-8 text-3xl font-extrabold tracking-tight text-red-600 sm:text-[5rem]">
						Search Results
					</h1>
				</div>
				<div className="flex items-center justify-center">
					<p>
						<span className="font-bold text-red-600">Entered Search:</span>{' '}
						{inputAddress}
					</p>
				</div>
				<section>
					<div className="w-sm mt-4 flex flex-col items-center justify-center bg-white md:max-w-screen-md lg:max-w-screen-lg">
						{searchGoogleResult?.map(
							(
								result: {
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
								},
								_index: number,
								_array: any[]
							) => (
								<SearchResult key={result.id} voterRecord={result} />
							)
						)}
					</div>
				</section>
			</div>
		</main>
	)

	return content
}

export default ResultsPage
