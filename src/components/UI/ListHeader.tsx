import { Text, View } from 'react-native';

const ListHeader = () => {
	return (
		<View
			style={{
				height: 50,
				width: '100%',
				backgroundColor: '#fa8b0c',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Text style={{ fontSize: 24, color: 'white' }}>
				FlatList in React Native
			</Text>
		</View>
	);
};

export default ListHeader;
