import { useNavigation } from '@react-navigation/native'
import { View, Text, SafeAreaView } from 'react-native'

import HeroTitle from '../components/HeroTitle'
import CustomButton from '../components/buttons/CustomButton'
import UserProfile from '../components/buttons/UserProfile'
import { useAuth } from '@clerk/clerk-expo'

const HomeScreen = () => {
	const navigation = useNavigation()
	const { signOut } = useAuth()

	const onLogoutPressed = () => {
		signOut()
	}

	return (
		<SafeAreaView className="flex-1 bg-gray-100 pt-12">
			<View className="flex-row items-center justify-between px-3">
				<Text className="text-lg font-bold">Hello</Text>
				<UserProfile />
			</View>

			<View className="top-1/4 flex">
				<HeroTitle />
			</View>
			<View className="top-1/3 flex items-center">
				<View className="p-4">
					<CustomButton
						text="Search"
						onPress={() => navigation.navigate('Search')}
						type="default"
					/>
				</View>
				<View className="p-4">
					<CustomButton
						text="Find Me"
						onPress={() => {
							navigation.navigate('Map')
						}}
						type="default"
					/>
				</View>
				<View className="p-4">
					<CustomButton
						text="Logout"
						onPress={onLogoutPressed}
						type="tertiary"
					/>
				</View>
			</View>
		</SafeAreaView>
	)
}

export default HomeScreen
