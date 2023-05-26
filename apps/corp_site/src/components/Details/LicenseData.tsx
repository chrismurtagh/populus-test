type TLicenseDataProps = { address: string | string[] }

const LicenseData = (props: TLicenseDataProps): JSX.Element => {
	const content = (
		<section>
			<div className="p-4 font-bold text-red-600">License Data</div>
			<div>
				<table className="text-sm">
					<tr>
						<td>Type:</td>
						<td>Expire Date:</td>
						<td>Issued To:</td>
					</tr>
				</table>
			</div>
		</section>
	)

	return content
}

export default LicenseData
