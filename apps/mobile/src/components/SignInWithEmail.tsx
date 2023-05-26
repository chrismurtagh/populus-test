import { useSignIn } from '@clerk/clerk-expo'
import React from 'react'
import { View } from 'react-native'
import HeroTitle from './HeroTitle'
import CustomInput from './CustomInput'
import CustomButton from './buttons/CustomButton'
import { useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'

const SignInWithEmail = () => {
	const { signIn, setSession, isLoaded } = useSignIn()
	const { control, handleSubmit, watch } = useForm()
	const navigation = useNavigation()

	const EMAIL_REGEX =
		/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]{2,6}$/

	const onSignInPress = async () => {
		if (!isLoaded) {
			return
		}

		const values = watch() // Get the current values of all registered fields

		try {
			const completeSignIn = await signIn.create({
				identifier: values.emailAddress,
				password: values.password
			})

			await setSession(completeSignIn.createdSessionId)
		} catch (err: any) {
			console.log('Error:> ' + (err.errors ? err.errors[0].message : err))
		}
	}

	//TODO: need to come up with a OTC process for this
	const onForgotPasswordPress = () => {
		navigation.navigate('Forgot Password')
	}

	return (
		<>
			<View className="my-20 p-4">
				<HeroTitle />
			</View>
			<View>
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
				<CustomInput
					name="password"
					placeholder="Password"
					control={control}
					rules={{
						required: 'Password is required',
						minLength: {
							value: 8,
							message: 'Password must be minimum of 8 characters'
						}
					}}
					secure
				/>
				<CustomButton
					text={'Sign In'}
					onPress={handleSubmit(onSignInPress)}
					type="default"
				/>
				<CustomButton
					text="Forgot Password?"
					onPress={onForgotPasswordPress}
					type="tertiary"
				/>
			</View>
		</>
	)
}

export default SignInWithEmail
