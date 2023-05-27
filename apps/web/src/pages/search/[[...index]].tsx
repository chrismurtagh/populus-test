import type { NextPage } from 'next'
import { useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import Searchbar from '../../components/Search/SearchBar'
import Link from 'next/link'
import Map from '../../components/Map'
import { useLoadScript } from '@react-google-maps/api'

const SearchPage: NextPage = () => {
	const [address, setAddress] = useState<string>('')
	const [location, setLocation] = useState<google.maps.LatLngLiteral | null>(
		null
	)

	const router = useRouter()

	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
		libraries: ['places']
	})

	const onLoad = useCallback((map: google.maps.Map | undefined) => {
		// TODO do something when the map loads
		console.log(map)
		console.log('add overlay to')
	}, [])

	const center = { lat: 27.367117, lng: -82.508158 }

	const onSelectAddress = useCallback(
		(
			selectedAddress: string,
			latitude: number | null,
			longitude: number | null
		) => {
			setAddress(selectedAddress)
			if (latitude !== null && longitude !== null) {
				setLocation({ lat: latitude, lng: longitude })
			} else {
				setLocation(null)
			}
		},
		[]
	)

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
					setLocation(selectedLocation)
					router.push({
						pathname: '/results',
						query: { address: selectedAddress, ...selectedLocation }
					})
				})
			}
		},
		[router]
	)

	if (loadError) {
		return <div>Error loading Google Maps API</div>
	}

	if (!isLoaded) {
		return <div>Loading Google Maps API...</div>
	}

	const content = (
		<div className="flex flex-col items-center text-gray-700">
			<div className="flex flex-col items-center justify-center">
				<div className="container flex flex-col items-center justify-center p-8 px-4">
					<h1 className="mb-12 text-5xl font-extrabold tracking-tight text-red-600 sm:text-[5rem]">
						Search
					</h1>
					<div className="z-10 flex w-80 rounded border bg-white">
						<Searchbar onSelectAddress={onSelectAddress} />
					</div>
					<div className="flex">
						<Link
							href="/advancedsearch"
							className="py-4 text-red-400 sm:pt-10 sm:pb-16"
						>
							Advanced Search
						</Link>
					</div>
					{address && location && (
						<>
							<div>
								<p>Please select a property from the map to view details.</p>
							</div>
							<div className="border">
								<Map
									center={center}
									location={location}
									onLoad={onLoad}
									onClick={onSelectProperty}
									containerStyle={{
										width: '90vw',
										height: '45vh'
									}}
								/>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	)

	return content
}

export default SearchPage
