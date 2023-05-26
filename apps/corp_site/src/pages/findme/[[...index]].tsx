import type { NextPage } from 'next'
import { useCallback, useMemo, useRef, useState } from 'react'
import Map from '../../components/Map'
import { useRouter } from 'next/router'

type TGoogleMap = google.maps.Map

const FindMePage: NextPage = () => {
	const [userLocation, setUserLocation] =
		useState<google.maps.LatLngLiteral | null>(null)

	const mapRef = useRef<TGoogleMap | null>(null)

	const center: google.maps.LatLngLiteral = useMemo(
		() => ({ lat: 27.367117, lng: -82.508158 }),
		[]
	)

	const router = useRouter()

	const handleFindMe = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				position => {
					const { latitude, longitude } = position.coords
					setUserLocation({ lat: latitude, lng: longitude })
					mapRef?.current?.panTo({ lat: latitude, lng: longitude })
				},
				() => {
					alert('Please allow location access to use this feature.')
				}
			)
		} else {
			alert('Geolocation is not supported by this browser.')
		}
	}

	const handleMapLoad = (map: TGoogleMap | undefined) => {
		if (map) {
			// Overlays go here.
		}
	}

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
					setUserLocation(selectedLocation)
					router.push({
						pathname: '/results',
						query: { address: selectedAddress }
					})
				})
			}
		},
		[router]
	)

	const content = (
		<main className="flex flex-col items-center text-gray-700">
			<div className="flex flex-col items-center justify-center gap-4">
				<div className="container flex flex-col items-center justify-center gap-4 px-4 py-8">
					<div className="flex border">
						<Map
							center={center}
							location={userLocation}
							onLoad={handleMapLoad}
							onClick={onSelectProperty}
							containerStyle={{
								width: '90vw',
								height: '63vh'
							}}
						/>
					</div>
					<div>
						<button
							onClick={handleFindMe}
							className="flex w-80 justify-center rounded border bg-red-100 font-bold text-red-600"
						>
							Find Me
						</button>
					</div>
				</div>
			</div>
		</main>
	)

	return content
}

export default FindMePage
