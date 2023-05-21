import { Text } from 'react-native';
import { ComicTypes } from '../../types/ComicTypes';

interface ComicItemProps {
	item: ComicTypes;
}

const ComicListItem: React.FC<ComicItemProps> = ({ item }) => {
	return <Text className='font-bold text-xl'>{item.title}</Text>;
};

export default ComicListItem;
