import CustomButton from './CustomButton'

//TODO add signin logic for google
const SocialSignInButtons = () => {
	const onGoogleSignInPressed = () => {
		console.warn('Google Sign In')
	}

	//TODO add signin logic for apple
	const onAppleSignInPressed = () => {
		console.warn('Apple Sign In')
	}

	return (
		<>
			<CustomButton
				text="Sign in with Google"
				onPress={onGoogleSignInPressed}
				type="google"
			/>
			<CustomButton
				text="Sign in with Apple"
				onPress={onAppleSignInPressed}
				type="apple"
			/>
		</>
	)
}

export default SocialSignInButtons
