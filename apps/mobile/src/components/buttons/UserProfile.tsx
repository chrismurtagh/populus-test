import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { View } from 'react-native'

const UserProfile = () => {
	const navigation = useNavigation()
	return (
		<View>
			<Ionicons
				name="person-circle"
				size={38}
				color="gray"
				onPress={() => navigation.navigate('User Profile')}
			/>
		</View>
	)
}

export default UserProfile
