import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { View, SafeAreaView } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import Constants from 'expo-constants'

import CustomButton from '../components/buttons/CustomButton'

//TODO Move API KEY to .env file
const GOOGLE_PLACES_API_KEY: string =
	Constants.expoConfig?.extra?.GOOGLE_PLACES_API_KEY

const onAdvancedSearchPressed = () => {
	console.log('Advanced Search')
}

const SearchScreen = () => {
	const [place, setPlace] = useState('')
	const navigation = useNavigation()

	useEffect(() => {
		if (place) {
			navigation.navigate('Map')
		}
	}, [place, navigation])

	//TODO Move the advanced search below the google places search
	return (
		<SafeAreaView className="flex-1 items-center bg-gray-100 pt-12">
			<View>
				<CustomButton
					type="tertiary"
					text="Advanced Search"
					onPress={onAdvancedSearchPressed}
				/>
			</View>
			<View className="flex h-full w-80">
				<GooglePlacesAutocomplete
					placeholder="Property Address"
					query={{
						key: GOOGLE_PLACES_API_KEY,
						language: 'en' // language of the results
					}}
					onPress={data => {
						setPlace(data.description)
					}}
					onFail={error => console.error(error)}
					requestUrl={{
						url: 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
						useOnPlatform: 'web'
					}} // this in only required for use on the web. See https://git.io/JflFv more for details.
				/>
			</View>
		</SafeAreaView>
	)
}

export default SearchScreen
