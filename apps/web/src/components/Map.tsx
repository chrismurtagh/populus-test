import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import { useMemo, useRef, useEffect } from 'react'

type TMapProps = {
	center: google.maps.LatLngLiteral
	location: google.maps.LatLngLiteral | null
	containerStyle: { width: string; height: string }
	onLoad: (map: google.maps.Map | undefined) => void
	onClick: (e: google.maps.MapMouseEvent) => void
}

const Map = ({
	center,
	location,
	containerStyle,
	onLoad,
	onClick
}: TMapProps): JSX.Element => {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
		libraries: ['places']
	})

	const mapRef = useRef<google.maps.Map | null>(null)

	const options = useMemo<google.maps.MapOptions>(
		() => ({
			disableDefaultUI: true,
			clickableIcons: false,
			mapId: 'd2e110fcafda1f73'
		}),
		[]
	)

	useEffect(() => {
		if (location) {
			mapRef?.current?.panTo(location)
		}
	}, [location])

	if (loadError) {
		return <div>Error loading Google Maps API</div>
	}

	if (!isLoaded) {
		return <div>Loading Google Maps API...</div>
	}

	console.log(location)
	console.log('hi from map')

	const content = (
		<GoogleMap
			zoom={19}
			center={location || center}
			mapContainerStyle={containerStyle}
			options={options}
			onLoad={onLoad}
			onClick={onClick}
		>
			{location && (
				<Marker
					position={location}
					icon={{
						url: 'https://maps.google.com/mapfiles/ms/micons/red-dot.png',
						scaledSize: new window.google.maps.Size(32, 32)
					}}
				/>
			)}
		</GoogleMap>
	)

	return content
}

export default Map
