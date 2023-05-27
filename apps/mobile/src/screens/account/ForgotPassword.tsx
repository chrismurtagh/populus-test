import { useNavigation } from '@react-navigation/native'
import { SubmitHandler, useForm } from 'react-hook-form'
import { View, ScrollView, SafeAreaView, Alert } from 'react-native'

import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/buttons/CustomButton'

import { useSignIn } from '@clerk/clerk-expo'
import { EmailLinkFactor } from '@clerk/types'

const EMAIL_REGEX =
	/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]{2,6}$/

type FieldValues = {
	emailAddress: string
}

const ForgotPassword = () => {
	const { control, handleSubmit } = useForm<FieldValues>()
	const { signIn, setSession } = useSignIn()
	const navigation = useNavigation()

	const onConfirmPressed: SubmitHandler<FieldValues> = async data => {
		try {
			// Prepare sign in with strategy and identifier
			await signIn!.create({
				strategy: 'email_link',
				identifier: data.emailAddress,
				redirectUrl: `${window.location.origin}/reset-password`
			})

			Alert.alert(
				'Link Sent',
				'A link has been sent to your email. Please open and click the link to continue.'
			)

			// Make sure that email magic links are supported on this user.
			const firstFactor = signIn!.supportedFirstFactors.find(
				f => f.strategy === 'email_link'
			) as EmailLinkFactor
			// Find the correct emailAddressId for the user.
			const { emailAddressId } = firstFactor

			// Begin the magic link flow
			const { startMagicLinkFlow } = signIn!.createMagicLinkFlow()

			// The redirectUrl should be a page where your user can change their password.
			const response = await startMagicLinkFlow({
				emailAddressId,
				redirectUrl: `${window.location.origin}/reset-password`
			})
			console.log(response)

			// Create a session once the user is verified
			if (response.status === 'complete' && setSession) {
				setSession(response.createdSessionId, () => {
					console.log('Setting session')
					navigation.navigate('User Profile')
				})
				return
			}
		} catch (err: any) {
			Alert.alert('Error', err.errors ? err.errors[0].message : err)
		}
	}

	const onSignInPressed = () => {
		navigation.navigate('SignIn')
	}

	return (
		<ScrollView>
			<SafeAreaView className="flex-1 items-center p-4">
				<View className="flex items-center">
					<CustomInput
						name="emailAddress"
						placeholder="Email"
						control={control}
						rules={{
							required: 'Email is required',
							pattern: {
								value: EMAIL_REGEX,
								message: 'Must be a valid email format'
							}
						}}
						secure={false}
					/>
					<CustomButton
						text="Confirm"
						onPress={handleSubmit(onConfirmPressed)}
						type="default"
					/>
					<CustomButton
						text="Back to Sign in"
						onPress={onSignInPressed}
						type="tertiary"
					/>
				</View>
			</SafeAreaView>
		</ScrollView>
	)
}

export default ForgotPassword
