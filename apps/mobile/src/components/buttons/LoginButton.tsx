import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { View, Text, TouchableOpacity } from 'react-native'

const LoginButton = (): JSX.Element => {
	const navigation = useNavigation()
	return (
		<View>
			<TouchableOpacity
				className="items-center justify-center p-6"
				onPress={() => navigation.navigate('Signin')}
			>
				<Ionicons name="person-circle" size={38} color="gray" />
				<Text>Login</Text>
			</TouchableOpacity>
		</View>
	)
}

export default LoginButton
