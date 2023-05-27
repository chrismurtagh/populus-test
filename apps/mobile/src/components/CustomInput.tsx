import { Control, Controller, RegisterOptions } from 'react-hook-form'
import { View, TextInput, Text } from 'react-native'

interface Props {
	control: Control<any>
	name: string
	placeholder: string
	rules?: RegisterOptions
	secure?: boolean
}

const CustomInput = ({
	control,
	name,
	placeholder,
	rules,
	secure = false
}: Props) => {
	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({
				field: { value, onChange, onBlur },
				fieldState: { error }
			}) => (
				<>
					<View
						className={`flex w-80 border bg-white ${
							error ? `border-red-500` : `border-gray-300`
						} my-1 rounded p-3`}
					>
						<TextInput
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
							placeholder={placeholder}
							secureTextEntry={secure}
						/>
					</View>
					{error && (
						<Text className="text-red-500">{error.message || 'Error'}</Text>
					)}
				</>
			)}
		/>
	)
}

export default CustomInput
