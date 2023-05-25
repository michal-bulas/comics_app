import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/RootStackParamList';

type navProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

const Welcome = () => {
	const navigation = useNavigation<navProp>();

	return (
		<View className='m-auto px-4'>
			<Text className='text-3xl font-bold text-center'>
				Welcome to Comics App
			</Text>
			<Text className='text-xl text-center'>
				Browse comics and check out their details
			</Text>
			<TouchableOpacity
				className='w-1/2 self-center mt-5  p-3 rounded-lg bg-orange-400 '
				onPress={() => navigation.navigate('Home')}
			>
				<Text className='text-white'>Continue</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Welcome;
