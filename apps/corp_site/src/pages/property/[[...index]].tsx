import type { NextPage } from 'next'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useLoadScript } from '@react-google-maps/api'
import Map from '../../components/Map'

import PropertyDetails from '../../components/Details/PropertyDetails'
import VotingHistory from '../../components/Details/VotingHistory'
import DonationHistory from '../../components/Details/DonationHistory'
import LicenseData from '../../components/Details/LicenseData'
import VoterProfile from '../../components/Details/VoterProfile'
import { trpc } from '../../utils/trpc'

const PropertyPage: NextPage = () => {
	const router = useRouter()
	const inputID: string | undefined =
		typeof router.query.id === 'string' ? router.query.id : undefined
	const id = inputID || ''

	const [lat, setLat] = useState(27.367117)
	const [lng, setLng] = useState(-82.508158)
	const [address, setAddress] = useState('')

	const {
		data: voterRecord,
		error,
		isLoading
	} = trpc.voterData.getVoterRecordByID.useQuery(id)

	const center = { lat: 27.367117, lng: -82.508158 }

	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
		libraries: ['places']
	})

	const formattedAddress: string =
		voterRecord?.residenceAddress1 &&
		voterRecord?.residenceCity &&
		voterRecord?.residenceState &&
		voterRecord?.residenceZipcode
			? `${voterRecord.residenceAddress1}, ${voterRecord.residenceCity}, ${voterRecord.residenceState}, ${voterRecord.residenceZipcode}`
			: ''

	const fetchLocation = async () => {
		if (voterRecord && formattedAddress) {
			const response = await fetch(
				`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
					formattedAddress
				)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
			)
			const data = await response.json()
			if (data.results.length > 0) {
				const { lat, lng } = data.results[0].geometry.location
				setLat(lat)
				setLng(lng)
			}
		}
	}
	useEffect(() => {
		if (formattedAddress) {
			fetchLocation()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formattedAddress])
	const currentLocation: google.maps.LatLngLiteral = { lat, lng }

	const onLoad = useCallback((map: google.maps.Map | undefined) => {
		// TODO do something when the map loads
		console.log(map)
	}, [])

	const onSelectProperty = useCallback(
		(event: google.maps.MapMouseEvent) => {
			if (event.latLng) {
				const geocoder = new google.maps.Geocoder()
				const selectedLocation: google.maps.LatLngLiteral = {
					lat: event.latLng.lat(),
					lng: event.latLng.lng()
				}
				geocoder.geocode({ location: selectedLocation }, results => {
					const selectedAddress =
						results?.[0]?.formatted_address ?? 'Unknown address'
					router.push({
						pathname: '/results',
						query: {
							address: selectedAddress
						}
					})
				})
			}
		},
		[router]
	)

	// Update the currentAddress state when the query changes
	useEffect(() => {
		if (formattedAddress) {
			setAddress(formattedAddress)
		}
	}, [formattedAddress])

	if (error) {
		console.error('An error occurred:', error)
	}

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (loadError) {
		return <div>Error loading Google Maps API</div>
	}

	if (!isLoaded) {
		return <div>Loading Google Maps API...</div>
	}

	const content = (
		<main className="flex flex-col items-center justify-center overflow-x-hidden text-gray-700">
			<div className="flex flex-col items-center justify-center">
				<div>
					<div className="flex flex-col items-center justify-center p-8 px-4">
						<h1 className="mb-12 text-5xl font-extrabold tracking-tight text-red-600 sm:text-[5rem]">
							Property Details
						</h1>
						<div>
							<p className="flex items-center justify-center">
								<span className="font-bold text-red-600">
									Selected Property:
								</span>{' '}
								{address}
							</p>
						</div>
					</div>
					{address && currentLocation && (
						<div className="bg-white sm:w-screen sm:px-16">
							<div className="flex flex-col sm:flex-row">
								<div className="flex items-center justify-center border sm:w-1/2 sm:flex-grow">
									<Map
										center={center}
										location={currentLocation}
										onLoad={onLoad}
										onClick={onSelectProperty}
										containerStyle={{
											width: '100%',
											height: '45vh'
										}}
									/>
								</div>
								<div className="flex-grow border p-4 sm:w-1/2">
									<VoterProfile id={id} />
								</div>
							</div>
							<div className="flex flex-col sm:flex-row">
								<div className="flex border p-4 sm:w-1/2 sm:flex-grow">
									<LicenseData address={id} />
								</div>
								<div className="flex-grow border p-4 sm:w-1/2">
									<DonationHistory address={id} />
								</div>
							</div>
							<div className="flex flex-col sm:flex-row">
								<div className="flex border p-4 sm:w-1/2 sm:flex-grow">
									<VotingHistory address={id} />
								</div>
								<div className="flex-grow border p-4 sm:w-1/2">
									<PropertyDetails address={id} />
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</main>
	)

	return content
}

export default PropertyPage
