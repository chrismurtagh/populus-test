import { trpc } from '../../utils/trpc'

type TVoterProfileProps = { id: string }

const VoterProfile = (voterID: TVoterProfileProps): JSX.Element => {
	const {
		data: voterData,
		error,
		isLoading
	} = trpc.voterData.getVoterRecordByID.useQuery(voterID.id)

	if (error) {
		console.error('An error occurred:', voterID.id, error)
	}

	if (isLoading) {
		return <div>Loading...</div>
	}

	const {
		nameFirst,
		nameLast,
		registrationDate,
		precinct,
		voterStatus,
		residenceAddress1,
		residenceAddress2,
		residenceCity,
		residenceState,
		residenceZipcode,
		partyAffiliation,
		gender,
		raceCode,
		daytimeAreaCode,
		daytimePhoneNumber,
		daytimePhoneExtension,
		birthDate,
		congressionalDistrict,
		houseDistrict,
		senateDistrict,
		countyCommissionDistrict,
		schoolBoardDistrict
	} = voterData ?? {}

	const formatDate = (date: Date) => {
		const formattedDate = date.toLocaleString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		})
		return formattedDate
	}

	const content = (
		<section>
			<div className="p-4 font-bold text-red-600">Voter Profile</div>
			<div>
				<table className="text-sm">
					<tr>
						<td>
							Voter Name: {nameFirst} {nameLast}
						</td>
						<td>
							Phone Number: ({daytimeAreaCode}) {daytimePhoneNumber}{' '}
							{daytimePhoneExtension}
						</td>
					</tr>
					<tr>
						<td>
							Residence: {residenceAddress1} {residenceAddress2} {residenceCity}
							, {residenceState} {residenceZipcode}
						</td>
					</tr>
					<tr>
						<td>Race: {raceCode}</td>
						<td>Gender: {gender}</td>
						<td>Party: {partyAffiliation}</td>
					</tr>
					<tr>
						<td>Birth Date: {birthDate ? formatDate(birthDate) : ''}</td>
						<td>
							Registered Date:{' '}
							{registrationDate ? formatDate(registrationDate) : ''}
						</td>
						<td>Status: {voterStatus}</td>
					</tr>
					<tr>
						<td>Precinct:{precinct}</td>
						<td>Donations: NA</td>
					</tr>
					<tr>
						<td>Voter Districts:</td>
					</tr>
					<tr>
						<td>School Board: {schoolBoardDistrict}</td>
						<td>County Commissioner: {countyCommissionDistrict}</td>
						<td>US House: {congressionalDistrict}</td>
						<td>FL Senate: {senateDistrict}</td>
						<td>FL House: {houseDistrict}</td>
					</tr>
				</table>
			</div>
		</section>
	)

	return content
}

export default VoterProfile
