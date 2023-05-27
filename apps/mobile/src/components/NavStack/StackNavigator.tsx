import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import HomeScreen from '../../screens/HomeScreen'
import MapScreen from '../../screens/MapScreen'
import SearchScreen from '../../screens/SearchScreen'
import ResetPassword from '../../screens/account/ResetPassword'
import UserProfileScreen from '../../screens/account/UserProfileScreen'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				options={{
					headerShown: false
				}}
				name="Home"
				component={HomeScreen}
			/>
			<Stack.Screen name="Map" component={MapScreen} />
			<Stack.Screen name="Search" component={SearchScreen} />
			<Stack.Screen name="User Profile" component={UserProfileScreen} />
			<Stack.Screen name="Reset Password" component={ResetPassword} />
		</Stack.Navigator>
	)
}

export default StackNavigator
