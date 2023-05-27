import { View, Text, TouchableOpacity } from 'react-native'

interface CustomButtonProps {
	onPress: () => void
	text: string
	type: 'google' | 'apple' | 'tertiary' | 'secondary' | 'default'
}

const CustomButton = ({ onPress, text, type }: CustomButtonProps) => {
	let touchClassName
	let textClassName
	switch (type) {
		case 'google':
			touchClassName = 'w-80 p-4 my-1 rounded bg-red-200'
			textClassName = 'font-bold text-red-500 text-center'
			break
		case 'apple':
			touchClassName = 'w-80 p-4 my-1 rounded bg-gray-300'
			textClassName = 'font-bold text-gray-500 text-center'
			break
		case 'tertiary':
			touchClassName = 'w-80 p-4 my-1 rounded'
			textClassName = 'font-bold text-gray-400 text-center'
			break
		case 'secondary':
			touchClassName = 'w-80 p-4 my-1 border border-blue-500 '
			textClassName = 'font-bold text-blue-500 text-center'
			break
		default:
			touchClassName = 'w-80 p-4 my-1 rounded bg-blue-500 '
			textClassName = 'font-bold text-white text-center'
			break
	}
	return (
		<View>
			<TouchableOpacity className={touchClassName} onPress={onPress}>
				<Text className={textClassName}>{text}</Text>
			</TouchableOpacity>
		</View>
	)
}

export default CustomButton
