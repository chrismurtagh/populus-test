import { useNavigation } from '@react-navigation/native'
import { View } from 'react-native'
import CustomButton from '../../components/buttons/CustomButton'

const UserProfileScreen = () => {
	const navigation = useNavigation()

	return (
		<View className="p-4">
			<CustomButton
				text="Reset Password"
				onPress={() => navigation.navigate('Reset Password')}
				type="tertiary"
			/>
		</View>
	)
}

export default UserProfileScreen
