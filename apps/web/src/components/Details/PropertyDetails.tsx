type TPropertyDetailsProps = { address: string | string[] }

const PropertyDetails = (props: TPropertyDetailsProps): JSX.Element => {
	const content = (
		<section>
			<div className="p-4 font-bold text-red-600">PropertyDetails</div>
			<div>
				<table className="text-sm">
					<tr>
						<td>Owner Name:</td>
					</tr>
					<tr>
						<td>Subdivision:</td>
						<td>Stories:</td>
						<td>Garage:</td>
					</tr>
					<tr>
						<td>Property Use:</td>
						<td>Market Value:</td>
						<td>Homesteaded:</td>
					</tr>
					<tr>
						<td>Living Area:</td>
						<td>Bedrooms:</td>
						<td>Pool:</td>
					</tr>
					<tr>
						<td>Taxes:</td>
						<td>Lot Size:</td>
						<td>Year Built:</td>
					</tr>
					<tr>
						<td>Bathrooms:</td>
						<td>Waterfront:</td>
					</tr>
				</table>
			</div>
		</section>
	)
	return content
}

export default PropertyDetails
