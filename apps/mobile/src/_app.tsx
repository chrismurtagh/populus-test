import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { TRPCProvider } from './utils/trpc'

import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo'
import { tokenCache } from './utils/cache'
import Constants from 'expo-constants'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigator from './components/NavStack/StackNavigator'
import LoggedOutStackNavigator from './components/NavStack/LoggedOutStackNavigator'

export const App = () => {
	return (
		<ClerkProvider
			publishableKey={Constants.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY}
			tokenCache={tokenCache}
		>
			<SignedIn>
				<TRPCProvider>
					<SafeAreaProvider>
						<StatusBar />
						<NavigationContainer>
							<StackNavigator />
						</NavigationContainer>
					</SafeAreaProvider>
				</TRPCProvider>
			</SignedIn>
			<SignedOut>
				<SafeAreaProvider>
					<StatusBar />
					<NavigationContainer>
						<LoggedOutStackNavigator />
					</NavigationContainer>
				</SafeAreaProvider>
			</SignedOut>
		</ClerkProvider>
	)
}
