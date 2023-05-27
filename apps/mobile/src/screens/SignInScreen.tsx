import React from 'react'

import { View, SafeAreaView } from 'react-native'

import SignInWithEmail from '../components/SignInWithEmail'

const SignInScreen = () => {
	return (
		<SafeAreaView className="bg-gray-100 bg-gradient-to-b from-gray-100 to-gray-600">
			<View className="flex h-full w-screen items-center justify-center">
				<SignInWithEmail />
			</View>
		</SafeAreaView>
	)
}

export default SignInScreen
