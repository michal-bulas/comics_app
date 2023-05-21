import { TouchableOpacity, Text } from 'react-native';
import { ComicTypes } from '../types/ComicTypes';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/RootStackParamList';
import { StackNavigationProp } from '@react-navigation/stack';

interface ComicItemProps {
	item: ComicTypes;
}

type navProp = StackNavigationProp<RootStackParamList, 'Home'>;

const ComicListItem: React.FC<ComicItemProps> = ({ item }) => {
	const navigation = useNavigation<navProp>();

	return (
		<TouchableOpacity
			onPress={() => navigation.navigate('Details', item)}
			className='my-5'
		>
			<Text className='font-bold text-xl'>{item.title}</Text>
		</TouchableOpacity>
	);
};

export default ComicListItem;
