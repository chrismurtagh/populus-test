type TVotingHistoryProps = { address: string | string[] }

const VotingHistory = (props: TVotingHistoryProps): JSX.Element => {
	const content = (
		<section>
			<div className="p-4 font-bold text-red-600">VotingHistory</div>
			<div>
				<table className="text-sm">
					<tr>
						<td>Election Date:</td>
						<td>Election Type:</td>
						<td>Activity:</td>
					</tr>
					<tr>
						<td>General Elections Rating:</td>
						<td>Primary Elections Rating:</td>
					</tr>
				</table>
			</div>
		</section>
	)

	return content
}

export default VotingHistory
