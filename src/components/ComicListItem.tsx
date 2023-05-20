import { View, Text, Image } from 'react-native';
import { ComicTypes } from '../types/ComicTypes';
interface ComicItemProps {
	item: ComicTypes;
}

const ComicListItem: React.FC<ComicItemProps> = ({ item }) => (
	<View>
		<Text>{item.title}</Text>
		<Image
			source={{ uri: item.img }}
			style={{ width: 200, height: 200 }}
		/>
	</View>
);

export default ComicListItem;
