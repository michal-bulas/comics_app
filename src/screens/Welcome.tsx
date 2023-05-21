import { Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/RootStackParamList';

type navProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

const Welcome = () => {
	const navigation = useNavigation<navProp>();

	return (
		<View className='my-auto'>
			<Text className='text-3xl font-bold text-center'>
				Welcome to Comics App
			</Text>
			<Text className='text-xl text-center'>
				Browse comics and check out their details
			</Text>
			<View className='w-1/2 self-center mt-5 '>
				<Button
					color='#ff7b00'
					title='Continue'
					onPress={() => navigation.navigate('Home')}
				/>
			</View>
		</View>
	);
};

export default Welcome;
