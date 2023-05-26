import * as Location from 'expo-location'
import { useState, useEffect } from 'react'
import { Text, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

const Map = () => {
	const [location, setLocation] = useState<Location.LocationObject | null>(null)
	const [errorMsg, setErrorMsg] = useState('')

	useEffect(() => {
		(async () => {
			const { status } = await Location.requestForegroundPermissionsAsync()
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied')
				return
			}

			const location = await Location.getCurrentPositionAsync({
				accuracy: Location.Accuracy.High
			})
			setLocation(location)
		})()
	}, [])

	let errorText = 'Waiting..'
	let lat = 37.78825
	let lng = -122.4324

	if (errorMsg) {
		errorText = errorMsg
	} else if (location) {
		errorText = ''
		lat = location.coords.latitude
		lng = location.coords.longitude
	}

	return (
		<>
			<View className="flex-1">
				{location && (
					<MapView
						className="h-screen w-screen"
						//TODO Force google map on iOS
						//provider={MapView.PROVIDER_GOOGLE}
						initialRegion={{
							latitude: lat,
							longitude: lng,
							latitudeDelta: 0.001722,
							longitudeDelta: 0.001321
						}}
					>
						<Marker
							coordinate={{
								latitude: location.coords.latitude,
								longitude: location.coords.longitude
							}}
						/>
					</MapView>
				)}
			</View>
			<View>
				{errorText ? (
					<Text>{errorText}</Text>
				) : (
					<>
						<Text>data overlay</Text>
						<Text>text overlay</Text>
					</>
				)}
			</View>
		</>
	)
}

export default Map
