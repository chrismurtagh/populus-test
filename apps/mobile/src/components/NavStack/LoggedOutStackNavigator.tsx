import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import SignInScreen from '../../screens/SignInScreen'
import ForgotPassword from '../../screens/account/ForgotPassword'

const Stack = createNativeStackNavigator()

const LoggedOutStackNavigator = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				options={{
					headerShown: false
				}}
				name="SignIn"
				component={SignInScreen}
			/>
			<Stack.Screen name="Forgot Password" component={ForgotPassword} />
		</Stack.Navigator>
	)
}

export default LoggedOutStackNavigator
