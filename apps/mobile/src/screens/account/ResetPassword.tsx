import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import { View, ScrollView, SafeAreaView } from 'react-native'

import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/buttons/CustomButton'

const EMAIL_REGEX =
	/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]{2,6}$/

const ResetPassword = () => {
	const { control, handleSubmit, watch } = useForm()
	//TODO: need to setup clerk password submit
	//const { forgotUserPasswordSubmit } = useAuth()
	const pwd = watch('password')
	const navigation = useNavigation()

	const onSubmitPressed = () => {
		//const onSubmitPressed = (data: unknown) => {
		//forgotUserPasswordSubmit(data)
	}

	const onSignInPressed = () => {
		navigation.navigate('User Profile')
	}

	return (
		<ScrollView>
			<SafeAreaView className="flex-1 items-center p-4">
				<View className="flex items-center">
					<CustomInput
						name="emailAddress"
						placeholder="Enter your Email Address"
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
						name="code"
						placeholder="Enter Confirmation code"
						control={control}
						rules={{ required: 'Confirmation code required' }}
						secure={false}
					/>
					<CustomInput
						name="password"
						placeholder="Enter Your New Password"
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
					<CustomInput
						name="confirmPassword"
						placeholder="Confirm Password"
						control={control}
						rules={{
							required: 'Need to Confirm Password',
							validate: (value: readonly unknown[]) =>
								value === pwd || 'Passwords do not match'
						}}
						secure
					/>
					<CustomButton
						text="Submit"
						onPress={handleSubmit(onSubmitPressed)}
						type="default"
					/>
					<CustomButton
						text="Back to User Profile"
						onPress={onSignInPressed}
						type="tertiary"
					/>
				</View>
			</SafeAreaView>
		</ScrollView>
	)
}

export default ResetPassword
