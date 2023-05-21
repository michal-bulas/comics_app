import { useRoute } from '@react-navigation/native';
import { Text, View, Image } from 'react-native';
import { ComicTypes } from '../types/ComicTypes';
import { RouteProp } from '@react-navigation/native';
import Divider from '../components/UI/Divider';
import { Dimensions } from 'react-native';

type ParamList = {
	params: ComicTypes;
};

const Details = () => {
	const {
		params: { num, title, img, year, alt },
	} = useRoute<RouteProp<ParamList>>();
	const screenWidth = Dimensions.get('window').width;

	return (
		<View className='space-y-2 mt-2'>
			<Text className='text-center text-2xl font-bold'>{title}</Text>
			<Image
				source={{ uri: img, width: screenWidth - 10, height: 200 }}
				resizeMode='contain'
				className='self-center'
			/>
			<Divider />
			<View className='mx-5 space-y-1'>
				<Text className='font-bold'>
					Year of release: <Text className='font-normal'>{year}</Text>
				</Text>
				<Text className='font-bold'>
					Comic No: <Text className='font-normal'>{num}</Text>
				</Text>
				<Text className='font-bold'>
					Description: <Text className='font-normal'>{alt}</Text>
				</Text>
			</View>
		</View>
	);
};

export default Details;
