type TDonationHistoryProps = { address: string | string[] }

const DonationHistory = (props: TDonationHistoryProps): JSX.Element => {
	const content = (
		<section>
			<div className="p-4 font-bold text-red-600">Donation History</div>
			<div>
				<table className="text-sm">
					<tr>
						<td>Year:</td>
						<td>Amount:</td>
						<td>Party:</td>
					</tr>
				</table>
			</div>
		</section>
	)

	return content
}

export default DonationHistory
